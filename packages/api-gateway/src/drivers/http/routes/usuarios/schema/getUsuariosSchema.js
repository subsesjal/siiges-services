const { usuario, persona, general } = require('./generalSchema');

const getUsuariosSchema = {
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
                  createdAt: general.createdAt,
                  updatedAt: general.updatedAt,
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = getUsuariosSchema;
