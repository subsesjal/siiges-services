const { usuario, general } = require('./generalSchema');
const personaResponseSchema = require('./personaResponseSchema');

const getAllUsuariosSchema = {
  tags: ['Usuario'],
  description: 'Return a list of users.',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
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
  },
};

module.exports = getAllUsuariosSchema;
