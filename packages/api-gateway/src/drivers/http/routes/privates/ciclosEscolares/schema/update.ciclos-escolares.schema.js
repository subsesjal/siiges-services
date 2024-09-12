const { cicloEscolar } = require('./properties/cicloEscolar');
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
    properties: cicloEscolar,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...cicloEscolar,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { updateCicloEscolarSchema };
