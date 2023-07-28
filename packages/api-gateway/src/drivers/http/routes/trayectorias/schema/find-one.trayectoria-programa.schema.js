const { trayectoria } = require('./properties/trayectoria');
const { responseProperties } = require('./properties/responseProperties');

const findOneTrayectoriaSchema = {
  tags: ['Solicitudes'],
  description: 'Given a programa id, then return a trayectoria from database.',
  params: {
    type: 'object',
    properties: { programaId: { type: 'integer' } },
    required: ['programaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...trayectoria,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = findOneTrayectoriaSchema;
