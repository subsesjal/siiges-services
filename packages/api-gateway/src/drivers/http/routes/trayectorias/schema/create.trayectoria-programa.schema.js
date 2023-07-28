const { trayectoria } = require('./properties/trayectoria');
const { responseProperties } = require('./properties/responseProperties');

const createAsignaturaSchema = {
  tags: ['Asignaturas'],
  description:
    'Given an object with trayectoria required data, then save the first time a new trayectoria in database.',
  body: {
    type: 'object',
    properties: {
      ...trayectoria,
    },
    required: ['programaId'],
  },
  response: {
    201: {
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

module.exports = createAsignaturaSchema;
