const { vigilante } = require('./properties/vigilante');
const { vigilancia } = require('./properties/vigilancia');
const { responseProperties } = require('./properties/responseProperties');

const findVigilanciasByVigilanteSchema = {
  tags: ['Vigilantes'],
  description: 'Find all vigilancias associated with a specific vigilante',
  params: {
    type: 'object',
    properties: {
      vigilanteId: { type: 'integer' },
    },
    required: ['vigilanteId'],
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
              ...vigilancia,
              vigilante: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...vigilante,
                  ...responseProperties,
                },
              },
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findVigilanciasByVigilanteSchema;
