const { institucion } = require('./properties/institucion');
const { ratificacionNombre } = require('./properties/ratificacionNombre');
const { responseProperties } = require('./properties/responseProperties');

const updateRatificacionNombreSchema = {
  tags: ['Ratificacion'],
  description: 'Given a ratificacion id and a institucion id, then return the ratificacion of institucion in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      ratificacionId: { type: 'integer' },
    },
    required: ['institucionId', 'ratificacionId'],
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
            institucion: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                usuarioId: { type: 'integer' },
                ...institucion,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = updateRatificacionNombreSchema;
