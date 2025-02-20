const { estatusSolicitudServicioSocial } = require('./properties/estatusSolicitudServicioSocial');
const { solicitudServicioSocial } = require('./properties/solicitudServicioSocial');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { responseProperties } = require('./properties/responseProperties');

const createSolicitudServicioSocialSchema = {
  tags: ['Solicitudes Servicio Social'],
  description: 'Recibe un objeto con los datos requeridos para una solicitud de Servicio Social y guarda por primera vez dicha solicitud en la base de datos.',
  body: {
    type: 'object',
    properties: {
      ...solicitudServicioSocial,
      domicilio: {
        type: 'object',
        properties: {
          ...domicilio,
        },
        required: ['municipioId', 'estadoId', 'calle', 'numeroExterior', 'colonia', 'codigoPostal'],
      },
    },
    required: [
      'estatusSolicitudServicioSocialId',
      'cicloEscolarId',
      'domicilio',
    ],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudServicioSocial,
            ...responseProperties,
            estatusSolicitudServicioSocial: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...estatusSolicitudServicioSocial,
                ...responseProperties,
              },
            },
            domicilio: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...domicilio,
                ...responseProperties,
              },
            },
            cicloEscolar: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...cicloEscolar,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = createSolicitudServicioSocialSchema;
