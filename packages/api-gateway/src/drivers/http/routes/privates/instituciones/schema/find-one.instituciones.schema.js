const { institucion } = require('./properties/institucion');
const { ratificacionNombre } = require('./properties/ratificacionNombre');
const { rector } = require('./properties/rector');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const findOneInstitucionSchema = {
  tags: ['Institucion'],
  description: 'Given a institucion id, then return a institucion of database.',
  params: {
    title: 'getInstitucionSchema',
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
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
                id: { type: 'integer' },
                ...rector,
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
};

module.exports = findOneInstitucionSchema;
