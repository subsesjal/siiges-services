const { plantelHigiene } = require('./properties/plantelHigiene');
const { responseProperties } = require('./properties/responseProperties');

const createUpdatePlantelHigieneSchema = {
  tags: ['Plantel'],
  description: 'Given an object with plantel higiene required data, then save a record of plantel-higiene in database.',
  params: {
    title: 'createUpdatePlantelHigieneSchema',
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
    },
    required: ['plantelId'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        ...plantelHigiene,
      },
      required: ['higieneId', 'cantidad'],
    },
    minItems: 11,
    maxItems: 11,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...plantelHigiene,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = createUpdatePlantelHigieneSchema;
