const { alumno } = require('./properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const updateAlumno = {
  tags: ['Alumnos'],
  description: 'Given a AlumnoId update an alumno',
  params: {
    title: 'update alumno',
    type: 'object',
    properties: {
      AlumnoId: { type: 'integer' },
    },
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
          },
        },
      },
    },
  },
};

module.exports = updateAlumno;
