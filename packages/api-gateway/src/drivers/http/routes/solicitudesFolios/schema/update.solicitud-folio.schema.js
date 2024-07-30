const { solicitudFolio } = require('./properties/solicitudFolio');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudFolioSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Given an object with solicitud folio required data, then update a solicitud in database.',
  params: {
    type: 'object',
    properties: {
      solicitudFolioId: { type: 'integer' },
    },
    required: ['solicitudFolioId'],
  },
  body: {
    type: 'object',
    properties: {
      ...solicitudFolio,
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            folioSolicitud: { type: 'string' },
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
