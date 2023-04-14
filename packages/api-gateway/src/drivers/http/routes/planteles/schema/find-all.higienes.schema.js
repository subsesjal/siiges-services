const { higiene } = require('./properties/higiene');
const { responseProperties } = require('./properties/responseProperties');

const findAllPlantelHigieneSchema = {
  tags: ['Plantel'],
  description: 'Return the list of higienes.',
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
              ...higiene,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllPlantelHigieneSchema;
