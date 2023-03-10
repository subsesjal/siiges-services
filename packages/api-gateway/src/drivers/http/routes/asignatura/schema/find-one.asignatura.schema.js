const { asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const findOneAsignaturaSchema = {
  tags: ['Asignatura'],
  description: 'Given a asignatura from database.',
  params: {
    type: 'object',
    properties: {
      asignaturaId: { type: 'integer' },
    },
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
            ...asignatura,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = findOneAsignaturaSchema;
