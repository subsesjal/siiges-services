const { formacion } = require('./properties/formacion');
const { formacionRector } = require('./properties/formacionRector');
const { responseProperties } = require('../properties/responseProperties');

const findAllFormacionRectorSchema = {
  tags: ['Formacion'],
  description: 'Get all the formations of a rector in institutions.',
  params: {
    type: 'object',
    properties: {
      rectorId: formacionRector.rectorId,
    },
    required: ['rectorId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...formacion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllFormacionRectorSchema };
