const { responseProperties } = require('./properties/responseProperties');
const { cicloEscolar } = require('./properties/cicloEscolar');

const createCicloEscolarSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Create a ciclo escolar.',
  body: {
    title: 'Data body',
    type: 'object',
    properties: {
      ...cicloEscolar,
    },
    required: Object.keys(cicloEscolar),
  },
  response: {
    201: {
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

module.exports = { createCicloEscolarSchema };
