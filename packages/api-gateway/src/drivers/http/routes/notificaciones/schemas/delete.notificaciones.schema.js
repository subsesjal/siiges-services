const { responseProperties } = require('./properties/responseProperties');
const { notificaciones } = require('./properties/notificaciones');

const deleteNotificacionesSchema = {
  tags: ['Notificaciones'],
  description: 'Delete a Notification.',
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

module.exports = { deleteNotificacionesSchema };
