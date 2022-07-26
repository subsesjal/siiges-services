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
      rolId: {
        type: 'number',
        description: 'role of a user',
      },
      usuario: {
        type: 'string',
        minLength: 3,
        maxLength: 25,
        description: 'usuario',
      },
      correo: { type: 'string', description: 'email of user' },
      contrasena: {
        type: 'string',
        minLength: 6,
        maxLength: 20,
        description: 'user id',
      },
      estatus: {
        type: 'number',
        minimum: 1,
        maximum: 2,
        description: 'estatus to disable or active (1/2)',
      },
      token_notificaciones: { type: 'string' },
    },
    required: ['rolId', 'usuario', 'correo', 'contrasena'],
  },
};

module.exports = {
  getUsuarioSchema,
  createUsuarioSchema,
};
