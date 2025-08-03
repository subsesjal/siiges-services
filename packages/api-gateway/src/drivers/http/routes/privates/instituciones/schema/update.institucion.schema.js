const { institucion } = require('./properties/institucion');
const { rector } = require('./properties/rector');
const { ratificacionNombre } = require('./properties/ratificacionNombre');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const updateInstitucionSchema = {
  tags: ['Institucion'],
  description: 'Given an object with institucion required data and institucionId, then update institucion in database.',
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
      ...institucion,
      rector: {
        type: 'object',
        properties: {
          ...rector,
          persona: {
            type: 'object',
            properties: {
              ...persona,
            },
          },
        },
        required: ['persona'],
      },
      ratificacionesNombre: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          ...ratificacionNombre,
          ...responseProperties,
        },
      },

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
            rector: {
              type: ['object', 'null'],
              properties: {
                ...rector,
                ...responseProperties,
                persona: {
                  type: 'object',
                  properties: {
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
};

module.exports = updateInstitucionSchema;
