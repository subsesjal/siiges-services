// External dependencies
const { checkers } = require('@siiges-services/shared');
// Internal dependencies
const { findOneDocumentType } = require('../document-type');
const { findOneEntityType } = require('../entity-type');

const getFileIdentifierObj = (findEntityType, findDocumentType) => async (fileData) => {
  // eslint-disable-next-line camelcase
  const { tipoEntidad, entidad_id, tipoDocumento } = fileData;

  const tipoEntidadItem = await findEntityType(tipoEntidad);
  const tipoDocumentoItem = await findDocumentType(tipoDocumento);

  checkers.throwErrorIfDataIsFalsy(tipoEntidadItem, 'files', 'tipoEntidad');
  checkers.throwErrorIfDataIsFalsy(entidad_id, 'files', 'entidadId');
  checkers.throwErrorIfDataIsFalsy(tipoDocumentoItem, 'files', 'tipoDocumento');

  return {
    entidad_id,
    tipo_entidad_id: tipoEntidadItem.id,
    tipo_documento_id: tipoDocumentoItem.id,
  };
};

module.exports = {
  getFileIdentifierObj: getFileIdentifierObj(findOneEntityType, findOneDocumentType),
};
