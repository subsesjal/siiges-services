const { vigilante } = require('./properties/vigilante');
const { responseProperties } = require('./properties/responseProperties');
const { persona } = require('../../usuarios/schema/properties/persona');

const findOneVigilanteSchema = {
  tags: ['Vigilancias'],
  description: 'Get a vigilante id.',
  params: {
    type: 'object',
    properties: { ...vigilante },
    required: ['personaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...vigilante,
            persona: {
              type: 'object',
              properties: {
                ...persona,
              },
            },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { findOneVigilanteSchema };
