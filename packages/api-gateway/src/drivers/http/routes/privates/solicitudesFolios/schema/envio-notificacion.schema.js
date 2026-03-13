const { solicitudFolio } = require('./properties/solicitudFolio');
const { responseProperties } = require('./properties/responseProperties');

const envioNotificacionSchema = {
  tags: ['Alumnos de una Solicitud de Folios'],
  description: 'Send notification for folios assigned.',
  params: {
    type: 'object',
    properties: {
      solicitudFolioId: { type: 'integer' },
    },
    required: ['solicitudFolioId'],
  },
  body: {
    type: 'object',
    properties: {
      tipoNotificacion: { type: 'string' },
    },
    required: ['tipoNotificacion'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudFolio,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = envioNotificacionSchema;
