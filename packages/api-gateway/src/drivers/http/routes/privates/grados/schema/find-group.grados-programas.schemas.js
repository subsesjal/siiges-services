const { grado } = require('../../grupos/schema/properties/grado');
const { responseProperties } = require('../../ciclosEscolares/schema/properties/responseProperties');

const findGroupGradosSchema = {
  tags: ['Grado'],
  description: 'Get a list Grados',
  params: {
    title: 'findProgramaAsignaturasSchema',
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
    },
    required: ['programaId'],
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
              ...grado,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findGroupGradosSchema };
