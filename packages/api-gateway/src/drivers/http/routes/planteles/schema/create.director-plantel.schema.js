const { persona } = require('../../usuarios/schema/properties/persona');
const { director } = require('../../instituciones/schema/properties/director');
const { responseProperties } = require('../../instituciones/schema/properties/responseProperties');

const createDirectorSchema = {
  tags: ['Plantel'],
  description: 'Given an object with director required data, then save a director in database.',
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
      ...director,
      persona: {
        type: 'object',
        properties: {
          ...persona,
        },
        required: ['nombre', 'apellidoPaterno'],
      },
    },
    required: ['persona'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...director,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...persona,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createDirectorSchema;
