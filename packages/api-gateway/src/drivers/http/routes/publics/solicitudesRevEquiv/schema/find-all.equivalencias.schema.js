const { equivalenciaProperties } = require('./properties/equivalenciaProperties');
const { responseProperties } = require('./properties/responseProperties');

const findAllEquivalenciasSchema = {
  tags: ['Equivalencias'],
  description: 'Return a list of equivalencias.',
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
              ...equivalenciaProperties,
              ...responseProperties,
              interesado: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  institucionDestino: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      acuerdoRvoe: { type: 'string' },
                      ...responseProperties,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: 'No equivalencias found',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

module.exports = findAllEquivalenciasSchema;
