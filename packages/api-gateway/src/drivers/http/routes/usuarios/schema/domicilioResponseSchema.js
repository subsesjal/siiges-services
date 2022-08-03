const {
  domicilio,
  municipio,
  estado,
  general,
} = require('./generalSchema');

const domicilioResponseSchema = {
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
};

module.exports = domicilioResponseSchema;
