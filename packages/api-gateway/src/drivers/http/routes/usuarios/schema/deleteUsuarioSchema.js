const {
  usuario,
  persona,
  general,
} = require('./generalSchema');

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
            persona: {
              type: 'object',
              properties: {
                id: persona.id,
                nombre: persona.nombre,
                apellidoPaterno: persona.apellidoPaterno,
                apellidoMaterno: persona.apellidoMaterno,
                fechaNacimiento: persona.fechaNacimiento,
                sexo: persona.sexo,
                nacionalidad: persona.nacionalidad,
                telefono: persona.telefono,
                celular: persona.celular,
                curp: persona.curp,
                rfc: persona.rfc,
                ine: persona.ine,
                fotografia: persona.fotografia,
                createdAt: general.createdAt,
                updatedAt: general.updatedAt,
                deletedAt: general.deletedAt,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = deleteUsuarioSchema;
