const { alumno } = require('./properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const deleteAlumnoSchema = {
  tags: ['Alumnos'],
  description: 'Given an AlumnoId delete an Alumno in data base',
  params: {
    title: 'delete alumno',
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
    },
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
          },
        },
      },
    },
  },
};

module.exports = deleteAlumnoSchema;
