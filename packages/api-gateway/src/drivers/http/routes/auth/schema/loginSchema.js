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
};

module.exports = loginSchema;
