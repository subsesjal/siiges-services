const { plantel } = require('../../instituciones/schema/properties/plantel');
const { higiene } = require('../properties/higiene');
const { responseProperties } = require('../../instituciones/schema/properties/responseProperties');

const createHigieneSchema = {
  tags: ['Higiene'],
  description: 'Given an object with higiene required data, then save a higiene in database.',
  body: {
    type: 'object',
    properties: {
      usuarioId: { type: 'integer' },
      ...higiene,
      plantelId: {
        type: 'object',
        properties: {
          ...plantel,
        },
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
            higieneId: { type: 'integer' },
            ...higiene,
            ...responseProperties,
            plantelId: {
              type: 'array',
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
