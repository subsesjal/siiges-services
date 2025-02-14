const { pais } = require('./properties/pais');
const { responseProperties } = require('./properties/responseProperties');

const findAllPaisesSchema = {
  tags: ['Pais'],
  description: 'Return a list of paises.',
  querystring: {
    type: 'object',
    properties: {
      estadoId: { type: 'integer' },
    },
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
              ...pais,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllPaisesSchema;
