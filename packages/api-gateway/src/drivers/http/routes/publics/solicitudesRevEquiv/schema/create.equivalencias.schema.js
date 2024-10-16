const equivalenciaProperties = require('./properties/equivalenciaProperties');
const { responseProperties } = require('./properties/responseProperties');

const createEquivalenciaSchema = {
  type: 'object',
  description: 'Create a new equivalencia.',
  body: {
    type: 'object',
    properties: {
      ...equivalenciaProperties,
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...equivalenciaProperties,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createEquivalenciaSchema;
