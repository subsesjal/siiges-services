const { estado } = require('./properties/estado');
const { responseProperties } = require('./properties/responseProperties');

const findAllEstadosSchema = {
  tags: ['Estado'],
  description: 'Return a list of estados.',
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
              ...estado,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllEstadosSchema;
