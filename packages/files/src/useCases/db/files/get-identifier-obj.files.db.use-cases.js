// External dependencies
const { checkers, Logger } = require('@siiges-services/shared');
// Internal dependencies
const { findOneDocumentType } = require('../document-type');
const { findOneEntityType } = require('../entity-type');

const getFileIdentifierObj = async (fileData) => {
  const { tipoEntidad, entidadId, tipoDocumento } = fileData;

  Logger.info(`[Files:getFileIdentifierObj]: Getting file identifier with
tipoEntidad ${tipoEntidad}
entidadId ${entidadId}
tipoDocumento ${tipoDocumento}`);

  const tipoEntidadItem = await findOneEntityType(tipoEntidad);
  const tipoDocumentoItem = await findOneDocumentType(tipoDocumento);

  checkers.throwErrorIfDataIsFalsy(tipoEntidadItem, 'tipoEntidad', tipoEntidad);
  checkers.throwErrorIfDataIsFalsy(entidadId, 'entidadId', entidadId);
  checkers.throwErrorIfDataIsFalsy(tipoDocumentoItem, 'tipoDocumento', tipoDocumento);

  Logger.info('[Files:getFileIdentifierObj]: Identifier obtained');

  return {
    entidadId,
    tipoDocumentoId: tipoDocumentoItem.id,
    tipoEntidadId: tipoEntidadItem.id,
  };
};

module.exports = getFileIdentifierObj;
