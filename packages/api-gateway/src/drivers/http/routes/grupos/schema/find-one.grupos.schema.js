const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { grado } = require('./properties/grado');
const { turno } = require('./properties/turno');
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
            ...responseProperties,
            cicloEscolar: {
              type: 'object',
              properties: {
                ...cicloEscolar,
                ...responseProperties,
              },
            },
            grado: {
              type: 'object',
              properties: {
                ...grado,
                ...responseProperties,
              },
            },
            turno: {
              type: 'object',
              properties: {
                ...turno,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { findOneGrupoSchema };
