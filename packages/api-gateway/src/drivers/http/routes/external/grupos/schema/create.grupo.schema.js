const { grupo } = require('./properties/grupo');
const { responseProperties } = require('./properties/responseProperties');

const createGrupo = {
  tags: ['Grupos'],
  description: 'Crea un nuevo Grupo asociado a un Programa Educativo específico.',
  querystring: {
    type: 'object',
    properties: { rvoe: { type: 'string' } },
    required: ['rvoe'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...grupo,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createGrupo };
