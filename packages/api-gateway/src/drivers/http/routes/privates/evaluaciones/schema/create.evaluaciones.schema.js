const { responseProperties } = require('./properties/responseProperties');
const { evaluacion } = require('./properties/evaluacion');

const createEvaluacionesSchema = {
  tags: ['Evaluaciones'],
  description: 'Create a evaluation.',
  body: {
    title: 'createDiligencia',
    type: 'object',
    properties: {
      ...evaluacion,
    },
    required: ['programaId', 'evaluadorId', 'cumplimientoId', 'estatus', 'fecha'],
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
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createEvaluacionesSchema;
