const { persona } = require('../../usuarios/schema/properties/persona');
const { evaluador } = require('./properties/evaluador');
const { responseProperties } = require('./properties/responseProperties');

const findAllEvaluadoresSchema = {
  tags: ['Inspecciones'],
  description: 'Find all Evaluadores with programas inspected',
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
              ...evaluador,
              ...responseProperties,
              persona: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...persona,
                  ...responseProperties,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findAllEvaluadoresSchema;
