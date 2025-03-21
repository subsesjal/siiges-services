const { responseProperties } = require('./properties/responseProperties');
const { solicitudServicioSocial } = require('./properties/solicitudServicioSocial');

const deleteSolicitudServSocSchema = {
  tags: ['Solicitudes Servicio Social'],
  description: 'Este endpoint elimina una solicitud de servicio social.',
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
            domicilio: {
              type: 'object',
            },
          },
        },
      },
    },
  },
};

module.exports = deleteSolicitudServSocSchema;
