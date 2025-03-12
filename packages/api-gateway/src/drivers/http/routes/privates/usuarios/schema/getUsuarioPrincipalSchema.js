const { persona } = require('./properties/persona');
const { responseProperties } = require('./properties/responseProperties');
const { usuario } = require('./properties/usuario');
const { rol } = require('./properties/rol');

const getUsuarioPrincipalSchema = {
  tags: ['Usuario'],
  description: 'Return a single user related to a given user.',
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

module.exports = getUsuarioPrincipalSchema;
