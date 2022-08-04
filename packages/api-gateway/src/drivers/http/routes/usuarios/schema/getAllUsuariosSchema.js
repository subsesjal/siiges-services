const { persona } = require('./properties/persona');
const { responseProperties } = require('./properties/responseProperties');
const { usuario } = require('./properties/usuario');

const getAllUsuariosSchema = {
  tags: ['Usuario'],
  description: 'Return a list of users.',
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
              ...usuario,
              ...responseProperties,
              persona: {
                type: 'object',
                properties: {
                  ...persona,
                  ...responseProperties,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = getAllUsuariosSchema;
