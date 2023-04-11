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
      higieneId: { type: 'integer' },
    },
    required: ['plantelId', 'higieneId'],
  },
  body: {
    type: 'object',
    properties: {
      cantidad: { type: 'integer' },
    },
    required: ['cantidad'],
  },
  response: {
    201: {
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

module.exports = createUpdatePlantelHigieneSchema;
