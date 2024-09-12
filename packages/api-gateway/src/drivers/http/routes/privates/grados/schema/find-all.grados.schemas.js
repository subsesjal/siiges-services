const { grado } = require('../../grupos/schema/properties/grado');
const { responseProperties } = require('../../ciclosEscolares/schema/properties/responseProperties');

const findAllGradosSchema = {
  tags: ['Grado'],
  description: 'Get a list Grados',
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
              ...grado,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllGradosSchema };
