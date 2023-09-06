const { asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const findProgramaAsignaturaSchema = {
  tags: ['Asignaturas'],
  description: 'Return an array of asignaturas grouped by programa.',
  querystring: {
    type: 'object',
    properties: {
      tipo: {
        type: 'integer',
        enum: [1, 2],
      },
    },
  },
  params: {
    title: 'findProgramaAsignaturasSchema',
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
    },
    required: ['programaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            properties: {
              id: { type: 'integer' },
              ...asignatura,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findProgramaAsignaturaSchema;
