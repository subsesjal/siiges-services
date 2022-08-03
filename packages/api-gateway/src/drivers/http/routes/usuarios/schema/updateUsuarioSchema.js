const {
  usuario,
  persona,
  general,
} = require('./generalSchema');

const updateUsuarioSchema = {
  tags: ['Usuario'],
  description: 'Given an object with user required data and userId, then update user in database.',
  title: 'updateUsuarioSchema',
  params: {
    type: 'object',
    properties: {
      usuarioId: usuario.usuarioId,
    },
    required: ['usuarioId'],
  },
  body: {
    type: 'object',
    properties: {
      rolId: usuario.rolId,
      usuario: usuario.usuario,
      correo: usuario.correo,
      estatus: usuario.estatus,
      actualizado: usuario.actualizado,
      persona: {
        type: 'object',
        properties: {
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
        },
      },
    },
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
              },
            },
          },
        },
      },
    },
  },
};

module.exports = updateUsuarioSchema;