const loginSchema = {
  tags: ['Login'],
  description: 'Login user',
  body: {
    type: 'object',
    properties: {
      usuario: { type: 'string' },
      contrasena: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  },
};

module.exports = loginSchema;
