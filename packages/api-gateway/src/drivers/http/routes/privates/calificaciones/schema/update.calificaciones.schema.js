const { calificacion } = require('../../alumnos/schema/properties/calificacion');
const { responseProperties } = require('../../alumnos/schema/properties/responseProperties');

const alumnosInscripcionSchema = {
  tags: ['Alumnos'],
  description: 'Given an object with alumnos and calificaciones required data, then update calificaciones in database.',
  params: {
    type: 'object',
    properties: {
      grupoId: { type: 'integer' },
      asignaturaId: { type: 'integer' },
    },
    required: ['grupoId', 'asignaturaId'],
  },
  querystring: {
    type: 'object',
    properties: {
      tipo: { type: 'integer' },
    },
    required: ['tipo'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        ...calificacion,
      },
      required: ['alumnoId', 'calificacion', 'fechaExamen'],
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            properties: {
              ...calificacion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = alumnosInscripcionSchema;
