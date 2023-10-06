const { grado } = require('./properties/grados');
const { grupos } = require('./properties/grupos');
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

module.exports = { findOneGrupoSchema };
