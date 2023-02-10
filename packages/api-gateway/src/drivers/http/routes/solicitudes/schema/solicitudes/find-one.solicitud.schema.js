const { solicitud } = require('./properties/solicitud');
const { responseProperties } = require('./properties/responseProperties');

const findOneSolicitudSchema = {
  tags: ['Solicitud'],
  description: 'Given a solicitud id, then return a solicitud from database.',
  params: {
    type: 'object',
    properties: {
      solicitudId: { type: 'integer' },
    },
    required: ['solicitudId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitud,
            ...responseProperties,
          ,
                  },
                },
              },
            },
          },
};

module.exports = findOneSolicitudSchema;
