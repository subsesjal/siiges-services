const { alumno } = require('./properties/alumno');
const { alumnoTipoTramite } = require('./properties/alumnoTipoTramite');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const updateAlumno = {
  tags: ['Alumnos'],
  description: 'Given an alumnoId update that alumno record',
  params: {
    type: 'object',
    properties: { alumnoId: { type: 'integer' } },
    required: ['alumnoId'],
  },
  body: {
    title: 'updateAlumno',
    type: 'object',
    properties: {
      ...alumno,
      persona: {
        type: 'object',
        properties: {
          ...persona,
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
            alumnoTipoTramite: {
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

module.exports = updateAlumno;
