const { asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const findOneAsignaturaSchema = {
  tags: ['Asignatura'],
  description: 'Given an asignatura id, then return a asignatura from database.',
  params: {
    type: 'object',
    properties: { asignaturaId: { type: 'integer' } },
    required: ['asignaturaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            asignatura: { ...asignatura },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = findOneAsignaturaSchema;
