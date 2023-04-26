const { plantelInfraestructura } = require('./properties/infraestructura');
const { responseProperties } = require('./properties/responseProperties');

const deletePlantelInfraestructuraSchema = {
  tags: ['Plantel'],
  description: 'Given ids with plantel and infraestructura, then delete the record of plantel-infraestructura in database.',
  params: {
    title: 'deletePlantelInfraestructuraSchema',
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
      id: { type: 'integer' },
    },
    required: ['plantelId', 'id'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...plantelInfraestructura,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = deletePlantelInfraestructuraSchema;
