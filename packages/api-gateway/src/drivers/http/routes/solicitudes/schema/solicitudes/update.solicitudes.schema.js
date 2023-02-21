const { solicitudes } = require('./properties/solicitud');
const { responseProperties } = require('./properties/responseProperties');

const updateSolicitudesSchema = {
  tags: ['Solicitudes'],
  description: 'Given an object with solicitudes required data, then update solicitud in database.',
  params: {
    type: 'object',
    properties: {
      solicitudId: { type: 'integer' },
    },
    required: ['solicitudId'],
  },
  body: {
    type: 'object',
    properties: {
      ...solicitudes,
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
            solicitudId: { type: 'integer' },
            ...solicitudes,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateSolicitudesSchema;
