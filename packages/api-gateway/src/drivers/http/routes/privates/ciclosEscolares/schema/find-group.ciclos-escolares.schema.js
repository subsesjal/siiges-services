const { cicloEscolar } = require('./properties/cicloEscolar');
const { responseProperties } = require('./properties/responseProperties');

const { programaId } = cicloEscolar;

const findGroupCicloEscolarSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Get a group Ciclo Escolar.',
  params: {
    type: 'object',
    properties: { programaId },
    required: ['programaId'],
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
              id: { type: 'integer' },
              ...cicloEscolar,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findGroupCicloEscolarSchema };
