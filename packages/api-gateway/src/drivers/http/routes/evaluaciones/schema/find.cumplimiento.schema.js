const { cumplimiento } = require('./properties/cumplimiento');
const { responseProperties } = require('./properties/responseProperties');

const findCumplimientoSchema = {
  tags: ['Evaluaciones'],
  description: 'Get cumplimiento',
  querystring: {
    type: 'object',
    properties: {
      puntuacion: { type: 'integer' },
      modalidad: { type: 'integer' },
    },
    required: ['puntuacion', 'modalidad'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...cumplimiento,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = findCumplimientoSchema;
