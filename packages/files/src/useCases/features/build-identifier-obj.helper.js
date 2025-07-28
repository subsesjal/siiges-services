// External dependencies
const { checkers, Logger } = require('@siiges-services/shared');
// Internal dependencies
const { findOneDocumentType } = require('../db/document-type');
const { findOneEntityType } = require('../db/entity-type');

const buildIdentifierObj = async (fileData) => {
  Logger.info('[files]: Construyendo identificador de archivo');
  const { tipoEntidad, entidadId, tipoDocumento } = fileData;

  const tipoEntidadItem = await findOneEntityType(tipoEntidad);
  const tipoDocumentoItem = await findOneDocumentType(tipoDocumento);

  checkers.throwErrorIfDataIsFalsy(tipoEntidadItem, 'tipoEntidad', tipoEntidad);
  checkers.throwErrorIfDataIsFalsy(entidadId, 'entidadId', entidadId);
  checkers.throwErrorIfDataIsFalsy(tipoDocumentoItem, 'tipoDocumento', tipoDocumento);

  Logger.info('[files]: Identificador de archivo construido correctamente', {
    entidadId,
    tipoDocumento: tipoDocumentoItem,
    tipoEntidad: tipoEntidadItem,
  });

  return {
    input: {
      tipoEntidad, // string recibido (ej. 'SOLICITUD')
      tipoDocumento, // string recibido (ej. 'OFICIO')
      entidadId,
    },
    identifiers: {
      tipoEntidadId: tipoEntidadItem.id,
      tipoDocumentoId: tipoDocumentoItem.id,
      entidadId,
    },
  };
};

module.exports = { buildIdentifierObj };
