const { alumnoGrupo } = require('./properties/alumnoGrupo');
const { alumno } = require('./properties/alumno');

const deleteAlumnoInscritoSchema = {
  tags: ['Alumnos'],
  description: 'Delete a specific AlumnoGrupo relation from the database based on alumnoId and grupoId.',
  params: {
    type: 'object',
    properties: {
      alumnoId: { type: 'integer' },
      grupoId: { type: 'integer' },
    },
    required: ['alumnoId', 'grupoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            alumno: {
              type: 'object',
              properties: {
                ...alumno,
              },
            },
            alumnoGrupo: {
              type: 'object',
              properties: {
                ...alumnoGrupo,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = {
  deleteAlumnoInscritoSchema,
};
