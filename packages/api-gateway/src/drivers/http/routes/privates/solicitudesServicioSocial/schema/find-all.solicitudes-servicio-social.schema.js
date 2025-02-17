const { solicitudServicioSocial } = require('./properties/solicitudServicioSocial');
const { estatusSolicitudServicioSocial } = require('./properties/estatusSolicitudServicioSocial');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudesServicioSocialSchema = {
  tags: ['Solicitudes Servicio Social'],
  description: 'Obtiene una lista de todas las solicitudes de Servicio Social',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
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
  },
};

module.exports = findAllSolicitudesServicioSocialSchema;
