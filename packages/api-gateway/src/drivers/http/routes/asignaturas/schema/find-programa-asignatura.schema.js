const { programa, asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const findProgramaAsignaturaSchema = {
  tags: ['Programas'],
  description: 'Return an object programa - asignatura.',
  params: {
    title: 'findProgramaAsignaturaSchema',
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
      asignaturaId: { type: 'integer' },
    },
    required: ['programaId', 'asignaturaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...programa,
            folio: { type: 'string' },
            ...responseProperties,
            asignatura: {
              type: 'object',
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
  },
};

module.exports = findProgramaAsignaturaSchema;
