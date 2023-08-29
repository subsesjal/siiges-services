const { infraestructura } = require('./properties/infraestructura');
const { responseProperties } = require('./properties/responseProperties');

const findGroupPlantelInfraestructuraSchema = {
  tags: ['Plantel'],
  description: 'Given the ID of plantel, then return the list of Infraestructura.',
  params: {
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
    },
    required: ['plantelId'],
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

module.exports = findGroupPlantelInfraestructuraSchema;
