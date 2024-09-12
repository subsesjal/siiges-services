const { usuario } = require('../../../privates/usuarios/schema/properties/usuario');
const { responseProperties } = require('../../../privates/usuarios/schema/properties/responseProperties');

const registerSchema = {
  tags: ['Usuario'],
  description: 'Given an object with user required data, then save a user in database.',
  body: {
    type: 'object',
    properties: {
      usuario: { type: 'string', minLength: 3, maxLength: 25 },
      correo: {
        type: 'string', format: 'email', minLength: 3, maxLength: 50,
      },
      contrasena: {
        type: 'string',
        minLength: 8,
        maxLength: 25,
        pattern: '^(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[@$!%*?&./])[A-Za-z0-9@$!%*?&./]{8,25}$',
      },
    },
    required: ['usuario', 'correo', 'contrasena'],
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
          },
        },
      },
    },
  },
};

module.exports = { registerSchema };
