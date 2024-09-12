const { plantelSeguridadSistema } = require('./properties/plantelSeguridadSistema');
const { responseProperties } = require('./properties/responseProperties');

const findGroupPlantelSeguridadSchema = {
  tags: ['Plantel'],
  description: 'Given the ID of plantel, then return the list of Higiene.',
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
              ...plantelSeguridadSistema,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findGroupPlantelSeguridadSchema;
