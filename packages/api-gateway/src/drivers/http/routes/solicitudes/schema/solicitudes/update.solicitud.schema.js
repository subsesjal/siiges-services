const { solicitud } = require('./properties/solicitud');
const { responseProperties } = require('./properties/responseProperties');

const updateSolicitudSchema = {
  tags: ['Solicitud'],
  description: 'Given an object with solicitud required data, then update solicitud in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['solicitudId'],
  },
  body: {
    type: 'object',
    properties: {
      ...solicitud,
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
            ...solicitud,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateSolicitudSchema;
