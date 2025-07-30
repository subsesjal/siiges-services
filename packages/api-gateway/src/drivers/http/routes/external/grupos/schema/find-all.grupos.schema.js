const { grupo } = require('./properties/grupo');
const { grado } = require('./properties/grado');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { turno } = require('./properties/turno');
const { responseProperties } = require('./properties/responseProperties');

const findAllGrupos = {
  tags: ['Grupos'],
  description: 'Obtiene todos los Grupos asociados a un Programa Educativo específico.',
  querystring: {
    type: 'object',
    properties: {
      rvoe: { type: 'string' },
      cicloEscolar: { type: 'string' },
      grado: { type: 'string' },
    },
    required: ['rvoe', 'cicloEscolar', 'grado'],
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
              ...grupo,
              ...responseProperties,
              cicloEscolar: {
                type: 'object',
                properties: {
                  ...cicloEscolar,
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
              grado: {
                type: 'object',
                properties: {
                  ...grado,
                  ...responseProperties,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllGrupos };
