const { responseProperties } = require('./properties/responseProperties');
const { notificacion } = require('./properties/notificacion');

const findOneNotificacionesSchema = {
  tags: ['Notificaciones'],
  description: 'Return a Notification.',
  params: {
    type: 'object',
    properties: {
      notificacionId: { type: 'number' },
    },
    required: ['notificacionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...notificacion,
            ...responseProperties,
            emailHtml: { type: 'string' },
          },
        },
      },
    },
  },
};

module.exports = { findOneNotificacionesSchema };
