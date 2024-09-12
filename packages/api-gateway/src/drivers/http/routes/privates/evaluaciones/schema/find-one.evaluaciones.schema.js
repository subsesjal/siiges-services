const { evaluacion } = require('./properties/evaluacion');
const { cumplimiento } = require('./properties/cumplimiento');
const { evaluador } = require('./properties/evaluador');
const { responseProperties } = require('./properties/responseProperties');

const findOneEvaluacionesSchema = {
  tags: ['Evaluaciones'],
  description: 'Get ona evaluation id.',
  params: {
    type: 'object',
    properties: { evaluacionId: { type: 'integer' } },
    required: ['evaluacionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...evaluacion,
            cumplimiento: {
              type: 'object',
              properties: {
                ...cumplimiento,
              },
            },
            evaluador: {
              type: 'object',
              properties: {
                ...evaluador,
              },
            },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = findOneEvaluacionesSchema;
