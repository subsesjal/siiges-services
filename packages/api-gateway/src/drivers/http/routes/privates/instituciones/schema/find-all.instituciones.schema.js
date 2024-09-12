const { institucion } = require('./properties/institucion');
const { ratificacionNombre } = require('./properties/ratificacionNombre');
const { responseProperties } = require('./properties/responseProperties');

const findAllInstitucionesSchema = {
  tags: ['Institucion'],
  description: 'Return a list of instituciones.',
  querystring: {
    tipoInstitucionId: {
      type: 'array',
      items: {
        type: 'integer',
        enum: [1, 2],
      },
      description: 'Array of tipoInstitucionId values',
    },
    esNombreAutorizado: {
      type: 'boolean',
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
              usuarioId: { type: 'integer' },
              ...institucion,
              ...responseProperties,
              ratificacionesNombre: {
                type: 'array',
                items: {
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
        },
      },
    },
  },
};

module.exports = findAllInstitucionesSchema;
