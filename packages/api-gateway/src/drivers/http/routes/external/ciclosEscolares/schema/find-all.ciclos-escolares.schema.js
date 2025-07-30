const { cicloEscolar } = require('./properties/cicloEscolar');
const { responseProperties } = require('./properties/responseProperties');

const findAllCiclosEscolares = {
  tags: ['Ciclo Escolar'],
  description: 'Obtiene todos los Ciclos Escolares asociados a un Programa Educativo específico.',
  querystring: {
    type: 'object',
    properties: { rvoe: { type: 'string' } },
    required: ['rvoe'],
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
              ...cicloEscolar,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllCiclosEscolares };
