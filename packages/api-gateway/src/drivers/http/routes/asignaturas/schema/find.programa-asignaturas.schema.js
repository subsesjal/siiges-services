const { asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const findProgramaAsignaturaSchema = {
  tags: ['Programas'],
  description: 'Return an array of asignaturas grouped by programa.',
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
