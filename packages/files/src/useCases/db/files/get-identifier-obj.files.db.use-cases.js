// External dependencies
const { checkers } = require('@siiges-services/shared');
// Internal dependencies
const { findOneDocumentType } = require('../document-type');
const { findOneEntityType } = require('../entity-type');

const getFileIdentifierObj = async (fileData) => {
  const { tipoEntidad, entidadId, tipoDocumento } = fileData;

  const tipoEntidadItem = await findOneEntityType(tipoEntidad);
  const tipoDocumentoItem = await findOneDocumentType(tipoDocumento);

  checkers.throwErrorIfDataIsFalsy(tipoEntidadItem, 'tipoEntidad', tipoEntidad);
  checkers.throwErrorIfDataIsFalsy(entidadId, 'entidadId', entidadId);
  checkers.throwErrorIfDataIsFalsy(tipoDocumentoItem, 'tipoDocumento', tipoDocumento);

  return {
    entidadId,
    tipoDocumentoId: tipoDocumentoItem.id,
    tipoEntidadId: tipoEntidadItem.id,
  };
};

module.exports = {
  getFileIdentifierObj,
};
