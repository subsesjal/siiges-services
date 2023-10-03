const { responseProperties } = require('./properties/responseProperties');
const { ciclosEscolares } = require('./properties/ciclosEscolares');

const createCicloEscolarSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Create a ciclo escolar.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...ciclosEscolares,
    },
    required: Object.keys(ciclosEscolares),
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...ciclosEscolares,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { createCicloEscolarSchema };
