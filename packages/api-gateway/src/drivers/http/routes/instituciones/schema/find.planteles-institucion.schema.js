const { institucion } = require('./properties/institucion');
const { plantel } = require('./properties/plantel');
const { domicilio } = require('./properties/domicilio');
const { municipio } = require('./properties/municipio');
const { estado } = require('./properties/estado');
const { ratificacionNombre } = require('./properties/ratificacionNombre');
const { responseProperties } = require('./properties/responseProperties');
const { rector } = require('./properties/rector');
const { persona } = require('../../usuarios/schema/properties/persona');

const findPlantelesInstitucionSchema = {
  tags: ['Plantel'],
  description: 'Given a institucion id, then return a institucion and its planteles of database.',
  params: {
    title: 'getInstitucionPlantelesSchema',
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
            ratificacionesNombre: {
              type: 'array',
              properties: {
                id: { type: 'integer' },
                ...ratificacionNombre,
                ...responseProperties,
              },
            },
            planteles: {
              type: 'array',
              properties: {
                id: { type: 'integer' },
                ...plantel,
                ...responseProperties,
                domicilio: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...domicilio,
                    ...responseProperties,
                    municipio: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...municipio,
                        ...responseProperties,
                      },
                    },
                    estado: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...estado,
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
    },
  },
};

module.exports = findPlantelesInstitucionSchema;
