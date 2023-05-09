const { inspeccionPreguntas } = require('./properties/inspeccionPreguntas');
const { responseProperties } = require('./properties/responseProperties');

const findAllInspeccionPreguntasSchema = {
  tags: ['Inspeccion'],
  description: 'Return the list of inspeccion-preguntas.',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...inspeccionPreguntas,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllInspeccionPreguntasSchema;
