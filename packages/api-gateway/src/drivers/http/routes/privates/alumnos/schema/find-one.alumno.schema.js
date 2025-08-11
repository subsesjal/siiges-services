const { alumno } = require('./properties/alumno');
const { alumnoTipoTramite } = require('./properties/alumnoTipoTramite');
const { persona } = require('../../usuarios/schema/properties/persona');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { equivalencia } = require('./properties/equivalencia');
const { responseProperties } = require('./properties/responseProperties');

const findOneAlumnoSchema = {
  tags: ['Alumnos'],
  description: 'Given an Alumno id, then return a Alumno from database.',
  params: {
    type: 'object',
    properties: { alumnoId: { type: 'integer' } },
    required: ['alumnoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...alumno,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...persona,
                ...responseProperties,
              },
            },
            alumnoTipoTramites: {
              type: 'array',
              items: {
                properties: {
                  id: { type: 'integer' },
                  ...alumnoTipoTramite,
                  ...responseProperties,
                },
              },
            },
            programa: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...programa,
                ...responseProperties,
                plantel: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...plantel,
                    ...responseProperties,
                    institucion: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...institucion,
                        ...responseProperties,
                      },
                    },
                    domicilio: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        ...domicilio,
                        ...responseProperties,
                      },
                    },
                  },
                },
              },
            },
            equivalencia: {
              type: ['object', 'null'],
              properties: {
                id: { type: 'integer' },
                ...equivalencia,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findOneAlumnoSchema;
