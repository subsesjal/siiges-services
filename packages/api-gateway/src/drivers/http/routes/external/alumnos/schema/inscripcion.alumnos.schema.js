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
          type: 'object',
          properties: {
            successes: { type: 'integer' },
            failures: { type: 'integer' },
            asignaturas: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  error: { nullable: true, type: 'string' },
                  message: { type: 'string' },
                  asignatura: {
                    type: 'object',
                    properties: {
                      clave: { type: 'string' },
                      alumno: {
                        type: 'object',
                        properties: {
                          matricula: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },
            },
            alumnos: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                  error: { nullable: true, type: 'string' },
                  alumno: {
                    type: 'object',
                    properties: {
                      matricula: { type: 'string' },
                      asignaturas: {
                        type: 'array',
                        items: { type: 'string' },
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

module.exports = { inscripcionSchema };
