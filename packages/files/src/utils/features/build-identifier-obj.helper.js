// External dependencies
const { checkers, Logger } = require('@siiges-services/shared');
// Internal dependencies
const { findOneDocumentType } = require('../../useCases/db/document-type');
const { findOneEntityType } = require('../../useCases/db/entity-type');

const buildIdentifierObj = async (fileData) => {
  const { tipoEntidad, entidadId, tipoDocumento } = fileData;

  const tipoEntidadItem = await findOneEntityType(tipoEntidad);
  const tipoDocumentoItem = await findOneDocumentType(tipoDocumento);

  checkers.throwErrorIfDataIsFalsy(tipoEntidadItem, 'tipoEntidad', tipoEntidad);
  checkers.throwErrorIfDataIsFalsy(entidadId, 'entidadId', entidadId);
  checkers.throwErrorIfDataIsFalsy(tipoDocumentoItem, 'tipoDocumento', tipoDocumento);

  Logger.info('[Files:getFileIdentifierObj]: Identifier obtained');

  return {
    entidadId,
    tipoDocumentoItem,
    tipoEntidadItem,
    fileMetaData: {
      tipoDocumentoId: tipoDocumentoItem.id,
      tipoEntidadId: tipoEntidadItem.id,
      entidadId,
    },
  };
};

module.exports = { buildIdentifierObj };
