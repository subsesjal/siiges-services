const { responseProperties } = require('./properties/responseProperties');

const inscripcionSchema = {
  tags: ['Alumnos'],
  description: 'Given an object with alumno grupo required data, then save a new AlumnoGrupo in database.',
  querystring: {
    type: 'object',
    properties: {
      rvoe: { type: 'string' },
      grupo: { type: 'string' },
      cicloEscolar: { type: 'string' },
      turno: { type: 'string' },
      grado: { type: 'string' },
    },
    required: ['rvoe', 'grupo', 'cicloEscolar', 'turno', 'grado'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        matricula: { type: 'string' },
        asignaturas: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'string',
          },
        },
      },
      required: ['matricula', 'asignaturas'],
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
              alumnoId: { type: 'integer' },
              alumnoAsignaturas: {
                type: 'array',
                items: {
                  properties: {
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

module.exports = { inscripcionSchema };
