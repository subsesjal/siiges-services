const { responseProperties } = require('./properties/responseProperties');
const { notificacion } = require('./properties/notificacion');

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
            ...notificacion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { deleteNotificacionesSchema };
