const { nivel } = require('../../../privates/grupos/schema/properties/nivel');
const { responseProperties } = require('./properties/responseProperties');

const findAllNivelesSchema = {
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
              ...nivel,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllNivelesSchema;
