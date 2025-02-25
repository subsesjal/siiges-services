const { niveles } = require('../../../privates/grupos/schema/properties/nivel');
const { responseProperties } = require('./properties/responseProperties');

const findAllPaisesSchema = {
  tags: ['Nivel'],
  description: 'Return a list of niveles.',
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
              ...niveles,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllPaisesSchema;
