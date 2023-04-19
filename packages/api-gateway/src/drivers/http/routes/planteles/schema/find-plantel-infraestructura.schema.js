const { infraestructura } = require('./properties/infraestructura');
const { responseProperties } = require('./properties/responseProperties');

const findInfraestructurabyPlantelSchema = {
  tags: ['Plantel'],
  description: 'Given the ID of plantel, then return the list of Infraestructura.',
  params: {
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },

    },

    required: ['infraestructuraId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            properties: {
              id: { type: 'integer' },
              ...infraestructura,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findInfraestructurabyPlantelSchema;
