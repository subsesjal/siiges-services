const { solicitudSeccion } = require('./properties/solicitudSeccion');
const { responseProperties } = require('./properties/responseProperties');

const setSolicitudSeccionSchema = {
  tags: ['Solicitudes'],
  description: 'Set status open - close solicitud - seccion.',
  params: {
    title: 'setSolicitudSeccionSchema',
    type: 'object',
    properties: {
      solicitudId: { type: 'integer' },
      seccionId: { type: 'integer' },
    },
    required: ['solicitudId', 'seccionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudSeccion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = setSolicitudSeccionSchema;
