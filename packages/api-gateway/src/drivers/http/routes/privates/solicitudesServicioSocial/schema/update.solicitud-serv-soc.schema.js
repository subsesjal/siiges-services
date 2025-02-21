const { solicitudServicioSocial } = require('./properties/solicitudServicioSocial');
const { estatusSolicitudServicioSocial } = require('./properties/estatusSolicitudServicioSocial');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('./properties/responseProperties');

const updateSolicitudServSocSchema = {
  tags: ['Solicitudes Servicio Social'],
  description:
    'Actualiza una solicitud de Servicio Social.',
  body: {
    type: 'object',
    properties: {
      ...solicitudServicioSocial,
      estatusSolicitudServicioSocial: {
        type: 'object',
        properties: {
          estatusSolicitudServicioSocialId: { type: 'integer' },
        },
      },
      cicloEscolar: {
        type: 'object',
        properties: {
          cicloEscolarId: { type: 'integer' },
        },
      },
      domicilio: {
        type: 'object',
        properties: {
          ...domicilio,
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

module.exports = updateSolicitudServSocSchema;
