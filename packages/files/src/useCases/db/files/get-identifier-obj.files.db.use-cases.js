// External dependencies
const { checkers } = require('@siiges-services/shared');
// Internal dependencies
const { findOneDocumentType } = require('../document-type');
const { findOneEntityType } = require('../entity-type');

const getFileIdentifierObj = (findEntityType, findDocumentType) => async (fileData) => {
  const { tipoEntidad, entidadId, tipoDocumento } = fileData;

  const tipoEntidadItem = await findEntityType(tipoEntidad);
  const tipoDocumentoItem = await findDocumentType(tipoDocumento);

  checkers.throwErrorIfDataIsFalsy(tipoEntidadItem, 'files', 'tipoEntidad');
  checkers.throwErrorIfDataIsFalsy(entidadId, 'files', 'entidadId');
  checkers.throwErrorIfDataIsFalsy(tipoDocumentoItem, 'files', 'tipoDocumento');

  return {
    entidadId,
    tipoEntidadId: tipoEntidadItem.id,
    tipoDocumentoId: tipoDocumentoItem.id,
  };
};

module.exports = {
  getFileIdentifierObj: getFileIdentifierObj(findOneEntityType, findOneDocumentType),
};
