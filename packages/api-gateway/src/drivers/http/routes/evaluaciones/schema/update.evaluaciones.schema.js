const { evaluacion } = require('./properties/evaluacion');
const { responseProperties } = require('./properties/responseProperties');

const updateEvaluacionesSchema = {
  tags: ['Evaluaciones'],
  description: 'Update a evaluation.',
  params: {
    type: 'object',
    properties: { evaluacionId: { type: 'integer' } },
    required: ['evaluacionId'],
  },
  body: {
    title: 'Update evaluation',
    type: 'object',
    properties: {
      ...evaluacion,
    },
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
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateEvaluacionesSchema;
