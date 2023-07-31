const { trayectoria } = require('./properties/trayectoria');
const { responseProperties } = require('./properties/responseProperties');

const updateTrayectoriaSchema = {
  tags: ['Solicitudes'],
  description: 'Given a trayectoria Id update Trayectorias',
  params: {
    title: 'update trayectorias',
    type: 'object',
    properties: {
      TrayectoriaId: { type: 'integer' },
    },
    required: ['trayectoriaId'],
  },
  body: {
    title: 'updateTrayectoria',
    type: 'object',
    properties: {
      ...trayectoria,
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
            ...trayectoria,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateTrayectoriaSchema;
