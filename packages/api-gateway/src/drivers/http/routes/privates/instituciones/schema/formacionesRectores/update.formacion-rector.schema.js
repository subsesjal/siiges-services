const { formacion } = require('./properties/formacion');
const { formacionRector } = require('./properties/formacionRector');
const { responseProperties } = require('../properties/responseProperties');

const updateFormacionRectorSchema = {
  tags: ['Formacion'],
  description: 'Update the information for the formation of a rector. It is created with the information from an object.',
  params: {
    type: 'object',
    properties: {
      ...formacionRector,
    },
    required: ['rectorId', 'formacionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...formacion,
    },
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

module.exports = { updateFormacionRectorSchema };
