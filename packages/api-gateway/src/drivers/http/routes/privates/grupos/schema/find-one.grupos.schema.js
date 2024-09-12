const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { grado } = require('./properties/grado');
const { turno } = require('./properties/turno');
const { grupo } = require('./properties/grupo');
const { nivel } = require('./properties/nivel');
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
                programa: {
                  type: 'object',
                  properties: {
                    nombre: { type: 'string' },
                    acuerdoRvoe: { type: 'string' },
                    ...responseProperties,
                    nivel: {
                      type: 'object',
                      properties: {
                        ...nivel,
                        ...responseProperties,
                      },
                    },
                  },
                },
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
