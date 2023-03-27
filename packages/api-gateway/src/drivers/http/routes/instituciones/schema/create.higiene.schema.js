const { plantel } = require('./create.plantel.schema');
const { higiene } = require('../higiene');
const { responseProperties } = require('./properties/responseProperties');

const createHigieneSchema = {
  tags: ['Plantel'],
  description: ' higiene in database.',
  params: {
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
    },
    required: ['plantelId'],
  },
  body: {
    type: 'object',
    properties: {
      ...plantel,
      persona: {
        type: 'object',
        properties: {
          ...higiene,
        },
        required: ['id'],
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...higiene,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...plantel,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createHigieneSchema;
