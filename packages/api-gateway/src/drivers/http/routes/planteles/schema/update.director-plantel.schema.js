const { persona } = require('../../usuarios/schema/properties/persona');
const { director } = require('../../instituciones/schema/properties/director');
const { responseProperties } = require('../../instituciones/schema/properties/responseProperties');

const updateDirectorSchema = {
  tags: ['Plantel'],
  description: 'Given an object with director ID, then update a director in database.',
  params: {
    type: 'object',
    properties: {
      directorId: { type: 'integer' },
      plantelId: { type: 'integer' },
    },
    required: ['directorId', 'plantelId'],
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
      },
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

module.exports = updateDirectorSchema;
