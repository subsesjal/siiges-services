const { asignatura } = require('./properties/asignatura');
const { responseProperties } = require('./properties/responseProperties');

const deleteAsignaturaSchema = {
  tags: ['Asignatura'],
  description: 'Given an asignaturaId delete an asignatura',
  params: {
    title: 'delete asignatura',
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
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

module.exports = deleteAsignaturaSchema;
