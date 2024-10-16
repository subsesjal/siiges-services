const { responseProperties } = require('./properties/responseProperties');
const equivalenciaProperties = require('./properties/equivalenciaProperties');

const findOneEquivalenciaSchema = {
  tags: ['equivalencia'],
  description: 'Returns an Equivalencia by providing an equivalencia ID.',
  params: {
    title: 'findOneEquivalenciaSchema',
    type: 'object',
    properties: {
      equivalenciaId: { type: 'integer' },
    },
    required: ['equivalenciaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...equivalenciaProperties,
            ...responseProperties,
          },
        },
      },
    },
    404: {
      description: 'Equivalencia not found',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
    400: {
      description: 'Bad request',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

module.exports = findOneEquivalenciaSchema;
