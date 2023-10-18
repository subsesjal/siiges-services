const { responseProperties } = require('./properties/responseProperties');
const { notificaciones } = require('./properties/notificaciones');

const findOneNotificacionesSchema = {
  tags: ['Notificaciones'],
  description: 'Return a Notification.',
  params: {
    type: 'object',
    properties: {
      notificacionId: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...notificaciones,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { findOneNotificacionesSchema };
