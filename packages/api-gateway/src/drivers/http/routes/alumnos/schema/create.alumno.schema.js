const { alumno } = require('./properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const createAlumnoSchema = {
  tags: ['Alumnos'],
  description:
    'Given an object with Alumno required data, then save the first time a new Alumno in database.',
  body: {
    type: 'object',
    properties: {
      ...alumno,
      persona: {
        type: 'object',
        properties: {
          ...persona,
        },
        required: ['nombre', 'apellidoPaterno'],
      },
    },
    required: ['personaId', 'situacionId', 'programaId', 'matricula', 'estatus'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...alumno,
            ...responseProperties,
            persona: {
              id: { type: 'integer' },
              ...persona,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = createAlumnoSchema;
