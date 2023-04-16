const { persona } = require('./properties/persona');
const { responseProperties } = require('./properties/responseProperties');
const { usuario } = require('./properties/usuario');
const { domicilio } = require('./properties/domicilio');

const updateUsuarioSchema = {
  tags: ['Usuario'],
  description: 'Given an object with user required data and userId, then update user in database.',
  title: 'updateUsuarioSchema',
  params: {
    type: 'object',
    properties: {
      usuarioId: { type: 'integer' },
    },
    required: ['usuarioId'],
  },
  body: {
    type: 'object',
    properties: {
      ...usuario,
      contrasena: { type: 'string', minLength: 3, maxLength: 25 },
      persona: {
        type: 'object',
        properties: {
          ...persona,
          domicilio: {
            type: 'object',
            properties: {
              ...domicilio,
            },
          },
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
            ...usuario,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...persona,
                ...responseProperties,
                domicilio: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...domicilio,
                    ...responseProperties,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = updateUsuarioSchema;
