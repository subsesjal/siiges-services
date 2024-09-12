const { grupo } = require('./properties/grupo');
const { responseProperties } = require('./properties/responseProperties');

const findGroupGrupoSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Get a group Grupo.',
  params: {
    type: 'object',
    properties: {
      cicloEscolarId: { type: 'integer' },
      gradoId: { type: 'integer' },
    },
    required: ['cicloEscolarId', 'gradoId'],
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
              ...grupo,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findGroupGrupoSchema };
