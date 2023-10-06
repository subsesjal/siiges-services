const { ciclosEscolares } = require('./properties/ciclosEscolares');
const { responseProperties } = require('./properties/responseProperties');

const updateCicloEscolarSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Get one Ciclo Escolar.',
  params: {
    type: 'object',
    properties: { cicloEscolarId: { type: 'integer' } },
    required: ['cicloEscolarId'],
  },
  body: {
    type: 'object',
    properties: ciclosEscolares,
  },
  response: {
    200: {
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

module.exports = { updateCicloEscolarSchema };
