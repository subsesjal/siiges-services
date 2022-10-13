const { ratificacionNombre } = require('./properties/ratificacionNombre');

const createRatificacionNombreSchema = {
  tags: ['Ratificacion'],
  description: 'Given an object with ratificacion required data, then save the ratificacion of institucion in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...ratificacionNombre,
    },
    required: ['esNombreAutorizado'],
  },
};

module.exports = createRatificacionNombreSchema;
