const { ratificacionNombre } = require('./properties/ratificacionNombre');
const { responseProperties } = require('./properties/responseProperties');

const updateRatificacionNombreSchema = {
  tags: ['Ratificacion'],
  description: 'Given an object with ratificacion required data, then update the ratificacion of institucion in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      ratificacionId: { type: 'integer' },
    },
    required: ['institucionId', 'ratificacionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...ratificacionNombre,
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
            ...ratificacionNombre,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateRatificacionNombreSchema;
