const { responseProperties } = require('./properties/responseProperties');
const { evaluacion } = require('./properties/evaluacion');
const { cumplimiento } = require('./properties/cumplimiento');

const createEvaluacionesSchema = {
  tags: ['Evaluaciones'],
  description: 'Create a evaluation.',
  body: {
    title: 'createDiligencia',
    type: 'object',
    properties: {
      ...evaluacion,
      cumplimiento: {
        type: 'object',
        properties: {
          ...cumplimiento,
        },
      },
    },
    required: ['programaId', 'evaluadorId', 'estatus', 'fecha'],
  },
  response: {
    201: {
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
                id: { type: 'integer' },
                ...cumplimiento,
              },
            },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createEvaluacionesSchema;
