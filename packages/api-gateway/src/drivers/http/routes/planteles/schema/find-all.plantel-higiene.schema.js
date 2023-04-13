const { higiene } = require('./properties/higiene');
const { responseProperties } = require('./properties/responseProperties');

const findAllHigieneSchema = {
  tags: ['Higiene'],
  description: 'Return a list of higiene.',
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
              usuarioId: { type: 'integer' },
              ...higiene,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllHigieneSchema;
