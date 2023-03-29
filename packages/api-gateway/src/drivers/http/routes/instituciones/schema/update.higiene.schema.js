const { higiene } = require('./properties/higiene');
const { responseProperties } = require('./properties/responseProperties');

const updateHigieneSchema = {
  tags: ['Higiene'],
  description: 'Given an object with higiene in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['higieneId'],
  },
  body: {
    type: 'object',
    properties: {
      ...higiene,
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
            higieneId: { type: 'integer' },
            ...higiene,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateHigieneSchema;
