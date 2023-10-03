const { grado } = require('./properties/grados');
const { grupos } = require('./properties/grupos');
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
      ...grupos,
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
};

module.exports = { updateGrupoSchema };
