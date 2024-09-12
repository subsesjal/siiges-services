const { institucion } = require('./properties/institucion');
const { ratificacionNombre } = require('./properties/ratificacionNombre');
const { rector } = require('./properties/rector');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const createInstitucionSchema = {
  tags: ['Institucion'],
  description: 'Given an object with institucion required data, then save a institucion in database.',
  body: {
    type: 'object',
    properties: {
      usuarioId: { type: 'integer' },
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
            required: ['nombre', 'apellidoPaterno'],
          },
        },
        required: ['persona'],
      },
      ratificacionesNombre: {
        type: 'object',
        properties: {
          ...ratificacionNombre,
        },
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            usuarioId: { type: 'integer' },
            ...institucion,
            ...responseProperties,
            rector: {
              type: 'object',
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
            ratificacionesNombre: {
              type: 'array',
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
};

module.exports = createInstitucionSchema;
