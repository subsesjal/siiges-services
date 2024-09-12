const { cicloEscolar } = require('./properties/cicloEscolar');
const { responseProperties } = require('./properties/responseProperties');

const deleteCicloEscolarSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Delete one Ciclo Escolar.',
  params: {
    type: 'object',
    properties: { cicloEscolarId: { type: 'integer' } },
    required: ['cicloEscolarId'],
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

module.exports = { deleteCicloEscolarSchema };
