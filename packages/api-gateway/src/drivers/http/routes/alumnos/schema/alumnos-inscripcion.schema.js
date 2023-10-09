const { alumnoGrupo } = require('./properties/alumnoGrupo');
const { calificacion } = require('./properties/calificacion');
const { responseProperties } = require('./properties/responseProperties');

const alumnosInscripcionSchema = {
  tags: ['Alumnos'],
  description: 'Given an object with alumno grupo required data, then save a new AlumnoGrupo in database.',
  params: {
    type: 'object',
    properties: {
      grupoId: { type: 'integer' },
    },
    required: ['grupoId'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        ...alumnoGrupo,
        asignaturas: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'integer',
          },
        },
      },
      required: ['alumnoId', 'asignaturas'],
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
                    id: { type: 'integer' },
                    ...calificacion,
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

module.exports = alumnosInscripcionSchema;
