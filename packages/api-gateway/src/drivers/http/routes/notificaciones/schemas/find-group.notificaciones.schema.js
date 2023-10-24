const { responseProperties } = require('./properties/responseProperties');
const { notificacion } = require('./properties/notificacion');

const findGroupNotificacionesSchema = {
  tags: ['Notificaciones'],
  description: 'Return a list of Notifications.',
  params: {
    type: 'object',
    properties: {
      usuarioId: { type: 'number' },
    },
  },
  querystring: {
    status: {
      type: 'array',
      description: 'list of status notifications',
      items: {
        type: 'string',
        enum: ['PENDING', 'OPENED', 'SENT'],
      },
    },
  },
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
              ...notificacion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findGroupNotificacionesSchema };
