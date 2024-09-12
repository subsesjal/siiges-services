const { plantelEdificioNivel } = require('./properties/plantelEdificioNivel');
const { responseProperties } = require('./properties/responseProperties');

const findGroupPlantelNivelesSchema = {
  tags: ['Plantel'],
  description: 'Given the ID of plantel, then return the list of Planteles.',
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
              ...plantelEdificioNivel,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findGroupPlantelNivelesSchema;
