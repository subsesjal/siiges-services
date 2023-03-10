const { asignatura } = require('./properties/asignatura');

const findOneAsignaturaSchema = {
  tags: ['Asignatura'],
  description: 'Asignatura information finder',
  params: {
    type: 'object',
    properties: { ...asignatura },
    required: ['asignaturaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            asignatura: { ...asignatura },
          },
        },
      },
    },
  },
};

module.exports = findOneAsignaturaSchema;
