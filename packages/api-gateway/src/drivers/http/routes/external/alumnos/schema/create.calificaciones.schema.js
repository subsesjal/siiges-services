const calificacionesSchema = {
  tags: ['Alumnos'],
  description: 'Registra las calificaciones ordinarias y extraordinarias de uno o más alumnos para una asignatura específica.',
  querystring: {
    type: 'object',
    properties: {
      rvoe: { type: 'string' },
      grupo: { type: 'string' },
      cicloEscolar: { type: 'string' },
      turno: { type: 'string' },
      grado: { type: 'string' },
      asignatura: { type: 'string' },
    },
    required: ['rvoe', 'grupo', 'cicloEscolar', 'turno', 'grado', 'asignatura'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        matricula: { type: 'string' },
        calificaciones: {
          type: 'object',
          properties: {
            ordinaria: {
              type: 'object',
              properties: {
                calificacion: { type: 'number' },
                fechaExamen: { type: 'string' }, // Cambio de date format
              },
              required: ['calificacion', 'fechaExamen'],
            },
            extraordinaria: {
              type: 'object',
              properties: {
                calificacion: { type: ['string', 'number'] },
                fechaExamen: { type: 'string' }, // Cambio de date format
              },
              required: ['calificacion', 'fechaExamen'],
            },
          },
          required: ['ordinaria'],
        },
      },
      required: ['matricula', 'calificaciones'],
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
            calificaciones: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  error: { nullable: true, type: 'string' },
                  message: { type: 'string' },
                  alumno: {
                    type: 'object',
                    properties: { matricula: { type: 'string' } },
                  },
                  calificaciones: {
                    type: 'object',
                    properties: {
                      ordinaria: {
                        type: 'object',
                        properties: {
                          calificacion: { type: 'number' },
                          fechaExamen: { type: 'string' }, // Cambio de date format
                        },
                      },
                      extraordinaria: {
                        type: 'object',
                        properties: {
                          calificacion: { type: ['string', 'number'] },
                          fechaExamen: { type: 'string' }, // Cambio de date format
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
                    properties: { matricula: { type: 'string' } },
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

module.exports = { calificacionesSchema };
