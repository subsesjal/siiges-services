const {
  usuario,
  general,
} = require('./generalSchema');
const personaResponseSchema = require('./personaResponseSchema');

const deleteUsuarioSchema = {
  tags: ['Usuario'],
  description: 'Given a userId, then delete user in database.',
  params: {
    type: 'object',
    properties: {
      usuarioId: usuario.usuarioId,
    },
    required: ['usuarioId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: usuario.id,
            rolId: usuario.rolId,
            usuario: usuario.usuario,
            correo: usuario.correo,
            estatus: usuario.estatus,
            createdAt: general.createdAt,
            updatedAt: general.updatedAt,
            deletedAt: general.deletedAt,
            persona: personaResponseSchema,
          },
        },
      },
    },
  },
};

module.exports = deleteUsuarioSchema;
