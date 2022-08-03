const {
  usuario,
  persona,
  domicilio,
  municipio,
  estado,
  general,
} = require('./generalSchema');

const getUsuarioDetalleSchema = {
  tags: ['Usuario'],
  description: 'Given an user id, then return a user of database.',
  params: {
    title: 'getUsuarioDetalleSchema',
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
                domicilio: {
                  type: 'object',
                  properties: {
                    id: domicilio.id,
                    municipioId: domicilio.municipioId,
                    estadoId: domicilio.estadoId,
                    calle: domicilio.calle,
                    numeroExterior: domicilio.numeroExterior,
                    numeroInterior: domicilio.numeroInterior,
                    colonia: domicilio.colonia,
                    codigoPostal: domicilio.codigoPostal,
                    latitud: domicilio.latitud,
                    longitud: domicilio.longitud,
                    createdAt: general.createdAt,
                    updatedAt: general.updatedAt,
                    estado: {
                      type: 'object',
                      properties: {
                        id: estado.id,
                        paisId: estado.paisId,
                        estado: estado.estado,
                        createdAt: general.createdAt,
                        updatedAt: general.updatedAt,
                      },
                    },
                    municipio: {
                      type: 'object',
                      properties: {
                        id: municipio.id,
                        estadoId: municipio.estadoId,
                        municipio: municipio.municipio,
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
      },
    },
  },
};

module.exports = getUsuarioDetalleSchema;
