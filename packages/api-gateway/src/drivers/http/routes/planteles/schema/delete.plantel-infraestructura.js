const { infraestructura } = require('./properties/infraestructura');
const { responseProperties } = require('./properties/responseProperties');

const deletePlantelInfraestructuraSchema = {
  tags: ['Plantel'],
  description: 'Given ids with plantel and infraestructura, then delete the record of plantel-infraestructura in database.',
  params: {
    title: 'deletePlantelInfraestructuraSchema',
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
      infraestructuraId: { type: 'integer' },
    },
    required: ['plantelId', 'infraestructuraId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...infraestructura,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = deletePlantelInfraestructuraSchema;
