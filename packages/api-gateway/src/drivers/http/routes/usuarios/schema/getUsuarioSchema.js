const { usuario, general } = require('./generalSchema');
const personaResponseSchema = require('./personaResponseSchema');

const getUsuarioSchema = {
  tags: ['Usuario'],
  description: 'Given an user id, then return a user of database.',
  params: {
    title: 'getUsuarioSchema',
    type: 'object',
    properties: {
      usuarioId: usuario.usuarioId,
    },
    required: ['usuarioId'],
  },
  response: {
    200: {
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
            persona: personaResponseSchema,
          },
        },
      },
    },
  },
};

module.exports = getUsuarioSchema;
