const { grado } = require('./properties/grados');
const { grupos } = require('./properties/grupos');
const { responseProperties } = require('./properties/responseProperties');

const findGroupGrupoSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Get a group Grupo.',
  params: {
    type: 'object',
    properties: { cicloEscolarId: { type: 'integer' } },
    required: ['cicloEscolarId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...grupos,
              grado: {
                type: 'object',
                properties: {
                  ...grado,
                },
              },
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findGroupGrupoSchema };
