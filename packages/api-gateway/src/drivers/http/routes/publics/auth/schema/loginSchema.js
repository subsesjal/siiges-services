const loginSchema = {
  tags: ['Login'],
  description: 'Login user',
  body: {
    type: 'object',
    properties: {
      usuario: { type: 'string' },
      contrasena: { type: 'string' },
    },
    examples: [{ usuario: 'arianag', contrasena: 'Aa/1234567890' }],
  },
};

module.exports = { loginSchema };
