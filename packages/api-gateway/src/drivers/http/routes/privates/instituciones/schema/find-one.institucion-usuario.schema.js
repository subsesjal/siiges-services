const { institucion } = require('./properties/institucion');
const { plantel } = require('./properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { municipio } = require('../../usuarios/schema/properties/municipio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { ratificacionNombre } = require('./properties/ratificacionNombre');
const { rector } = require('./properties/rector');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const findOneInstitucionUsuarioSchema = {
  tags: ['Institucion'],
  description: 'Given a institucion id, then return a institucion of database.',
  params: {
    title: 'getInstitucionSchema',
    type: 'object',
    properties: {
      usuarioId: { type: 'integer' },
    },
    required: ['usuarioId'],
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
            planteles: {
              type: 'array',
              items: {
                type: 'object',
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
  },
};

module.exports = findOneInstitucionUsuarioSchema;
