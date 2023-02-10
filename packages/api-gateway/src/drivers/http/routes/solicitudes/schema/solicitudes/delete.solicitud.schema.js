const { solicitud } = require('./properties/solicitud');
const { responseProperties } = require('./properties/responseProperties');

const deleteSolicitudSchema = {
  tags: ['Solicitud'],
  description: 'Given a tiposolicitudId, then delete Solicitud in database.',
  params: {
    type: 'object',
    properties: {
      solicitudId: { type: 'integer' },
    },
    required: ['solicitudId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            solicitudId: { type: 'integer' },
            ...solicitud,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = deleteSolicitudSchema;
