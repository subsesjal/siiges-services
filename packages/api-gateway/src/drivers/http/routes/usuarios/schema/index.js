const getUsuarioSchema = {
  description: 'Given a userId, then return a user if it exist in database.',
  security: [{ Bearer: [] }],
  params: {
    type: 'object',
    properties: {
      usuarioId: { type: 'number', description: 'user id' },
    },
    required: ['usuarioId'],
  },
};

const createUsuarioSchema = {
  description:
    'Given an object with user required data, then save a user in database.',
  security: [{ Bearer: [] }],
  body: {
    type: 'object',
    properties: {
      usuario: {
        type: 'string',
        minLength: 3,
        maxLength: 25,
        description: 'usuario',
      },
      email: { type: 'string', description: 'email of user' },
      contrasena: {
        type: 'string',
        minLength: 6,
        maxLength: 20,
        description: 'user id',
      },
      /* estatus: {
        type: "number",
        minimum: 1,
        maximum: 2,
        description: "estatus disable or active (1/2)",
      }, */
      token_notificaciones: { type: 'string' },
    },
    required: ['usuario', 'email', 'contrasena'],
  },
};

module.exports = {
  getUsuarioSchema,
  createUsuarioSchema,
};
