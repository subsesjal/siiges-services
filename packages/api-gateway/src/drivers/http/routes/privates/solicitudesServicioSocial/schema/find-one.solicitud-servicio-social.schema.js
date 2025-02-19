const { solicitudServicioSocial } = require('./properties/solicitudServicioSocial');
const { estatusSolicitudServicioSocial } = require('./properties/estatusSolicitudServicioSocial');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('./properties/responseProperties');

const findOneSolicitudServicioSocialSchema = {
  tags: ['Solicitudes Servicio Social'],
  description:
    'Obtiene los detalles de una solicitud de Servicio Social por su id',
  params: {
    type: 'object',
    properties: {
      solicitudServicioSocialId: { type: 'integer' },
    },
    required: ['solicitudServicioSocialId'],
  },
  response: {
    200: {
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
            cicloEscolar: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...cicloEscolar,
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
          },
        },
      },
    },
  },
};

module.exports = findOneSolicitudServicioSocialSchema;
