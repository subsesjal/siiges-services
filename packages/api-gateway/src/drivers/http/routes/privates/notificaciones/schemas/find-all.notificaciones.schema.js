const { responseProperties } = require('./properties/responseProperties');
const { notificacion } = require('./properties/notificacion');
const { usuario } = require('../../usuarios/schema/properties/usuario');
const { persona } = require('../../usuarios/schema/properties/persona');

const findAllNotificacionesSchema = {
  tags: ['Notificaciones'],
  description: 'Return a list of Notifications',
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
              usuario: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...usuario,
                  ...responseProperties,
                  persona: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...persona,
                      ...responseProperties,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllNotificacionesSchema };
