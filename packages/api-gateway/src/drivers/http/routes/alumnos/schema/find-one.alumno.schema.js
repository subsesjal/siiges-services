const { alumno } = require('./properties/alumno');
const { alumnoTipoTramite } = require('./properties/alumnoTipoTramite');
const { persona } = require('../../usuarios/schema/properties/persona');
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
          },
        },
      },
    },
  },
};

module.exports = findOneAlumnoSchema;
