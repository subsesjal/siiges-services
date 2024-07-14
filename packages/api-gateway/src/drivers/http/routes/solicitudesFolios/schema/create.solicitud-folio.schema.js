const { solicitudFolio } = require('./properties/solicitudFolio');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudFolioSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Given an object with solicitud folio required data, then save the first time a new solicitud in database.',
  body: {
    type: 'object',
    properties: {
      tipoDocumentoId: { type: 'integer' },
      tipoSolicitudFolioId: { type: 'integer' },
      estatusSolicitudFolioId: { type: 'integer' },
      programaId: { type: 'integer' },
      fecha: { type: 'string', format: 'date-time' },
      folioPago: { type: 'string' },
    },
    required: ['tipoDocumentoId', 'tipoSolicitudFolioId', 'estatusSolicitudFolioId', 'programaId', 'fecha', 'folioPago'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            folio: { type: 'string' },
            ...solicitudFolio,
            ...responseProperties,
            programa: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...programa,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createSolicitudFolioSchema;
