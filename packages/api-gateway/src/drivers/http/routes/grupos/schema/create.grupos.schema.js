const { responseProperties } = require('./properties/responseProperties');
const { grupo } = require('./properties/grupo');

const createGrupoSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Create a grupo.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...grupo,
    },
    required: Object.keys(grupo),
  },
  response: {
    201: {
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

module.exports = { createGrupoSchema };
