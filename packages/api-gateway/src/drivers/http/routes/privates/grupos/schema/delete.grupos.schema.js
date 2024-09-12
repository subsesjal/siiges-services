const { grupo } = require('./properties/grupo');
const { responseProperties } = require('./properties/responseProperties');

const deleteGrupoSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Delete one Grupo.',
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
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { deleteGrupoSchema };
