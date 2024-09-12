const { usuario } = require('./properties/usuario');
const { persona } = require('./properties/persona');
const { rol } = require('./properties/rol');
const { responseProperties } = require('./properties/responseProperties');

const getUsuarioSchema = {
  tags: ['Usuario'],
  description: 'Given an user id, then return a user of database.',
  params: {
    title: 'getUsuarioSchema',
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

module.exports = getUsuarioSchema;
