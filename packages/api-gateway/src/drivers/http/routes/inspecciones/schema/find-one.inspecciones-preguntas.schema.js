const { responseProperties } = require('./properties/responseProperties');
const { inspeccionInspeccionPregunta } = require('./properties/inspeccionInspeccionPreguntas');

const findOneInspeccionesPreguntasSchema = {
  tags: ['Inspecciones'],
  description: 'Find one a inspection answers',
  params: {
    title: 'find One inspection answers',
    type: 'object',
    properties: {
      inspeccionId: { type: 'integer' },
    },
    required: ['inspeccionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ...inspeccionInspeccionPregunta,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findOneInspeccionesPreguntasSchema };
