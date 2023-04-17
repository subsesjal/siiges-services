const { plantelHigiene } = require('./properties/plantelHigiene');
const { responseProperties } = require('./properties/responseProperties');

const deletePlantelHigieneSchema = {
  tags: ['Plantel'],
  description: 'Given ids with plantel and higiene, then delete the record of plantel-higiene in database.',
  params: {
    title: 'deletePlantelHigieneSchema',
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
      higieneId: { type: 'integer' },
    },
    required: ['plantelId', 'higieneId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
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
};

module.exports = deletePlantelHigieneSchema;
