const { persona } = require('./properties/persona');
const { responseProperties } = require('./properties/responseProperties');
const { usuario } = require('./properties/usuario');
const { rol } = require('./properties/rol');

const getAllUsuariosSchema = {
  tags: ['Usuario'],
  description: 'Return a list of users related to a user.',
  params: {
    type: 'object',
    properties: {
      usuarioId: { type: 'integer' },
    },
    required: ['usuarioId'],
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
              ...usuario,
              ...responseProperties,
              rol: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...rol,
                  ...responseProperties,
                },
              },
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
