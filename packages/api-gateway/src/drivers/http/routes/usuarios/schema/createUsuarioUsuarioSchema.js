const { persona } = require('./properties/persona');
const { responseProperties } = require('./properties/responseProperties');
const { usuario } = require('./properties/usuario');

const createUsuarioUsuarioSchema = {
  tags: ['Usuario'],
  description: 'Given an object with secondary user required data, then save a user in database.',
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
      contrasena: {
        type: 'string',
        minLength: 8,
        maxLength: 25,
        pattern: '^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&./])[A-Za-z0-9@$!%*?&./]{8,25}$',
      },
      persona: {
        type: 'object',
        properties: {
          ...persona,
        },
        required: ['nombre', 'apellidoPaterno'],
      },
    },
    required: ['rolId', 'usuario', 'correo', 'contrasena', 'actualizado', 'persona'],
  },
  response: {
    201: {
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
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createUsuarioUsuarioSchema;
