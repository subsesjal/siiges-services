const { grado } = require('./properties/grado');
const { grupo } = require('./properties/grupo');
const { responseProperties } = require('./properties/responseProperties');

const findOneGrupoSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Get one Grupo.',
  params: {
    type: 'object',
    properties: { grupoId: { type: 'integer' } },
    required: ['grupoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...grupo,
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
};

module.exports = { findOneGrupoSchema };
