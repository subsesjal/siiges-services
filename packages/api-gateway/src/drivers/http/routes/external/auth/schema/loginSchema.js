const { responseProperties } = require('./properties/responseProperties');

const loginSchema = {
  tags: ['Login'],
  description: 'Login user',
  body: {
    type: 'object',
    properties: {
      usuario: { type: 'string' },
      contrasena: { type: 'string' },
    },
    required: ['usuario', 'contrasena'],
    examples: [{ usuario: 'arianag', contrasena: 'Aa/1234567890' }],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            usuario: { type: 'string' },
            correo: {
              type: 'string', format: 'email',
            },
            ...responseProperties,
            rol: {
              type: 'object',
              properties: {
                nombre: { type: 'string' },
                descripcion: { type: 'string' },
                ...responseProperties,
              },
            },
          },
        },
        token: { type: 'string' },
      },
    },
  },
};

module.exports = { loginSchema };
