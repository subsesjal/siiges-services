const { grado } = require('./properties/grado');
const { grupo } = require('./properties/grupo');
const { responseProperties } = require('./properties/responseProperties');

const updateGrupoSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Get one Grado.',
  params: {
    type: 'object',
    properties: { grupoId: { type: 'integer' } },
    required: ['grupoId'],
  },
  body: {
    type: 'object',
    properties: {
      ...grupo,
      ...grado,
    },
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

module.exports = { updateGrupoSchema };
