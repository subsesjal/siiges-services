const { formacion } = require('./properties/formacion');
const { formacionRector } = require('./properties/formacionRector');
const { responseProperties } = require('../properties/responseProperties');

const findOneFormacionRectorSchema = {
  tags: ['Formacion'],
  description: 'Get details of a formation of a rector in institutions.',
  params: {
    type: 'object',
    properties: {
      ...formacionRector,
    },
    required: ['rectorId', 'formacionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
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
};

module.exports = { findOneFormacionRectorSchema };
