const { solicitudBecaAlumno } = require('./properties/solicitudBecaAlumno');
const { responseProperties } = require('./properties/responseProperties');

const deleteSolicitudBecaAlumnoSchema = {
  tags: ['Solicitudes Becas Alumnos'],
  description: 'Este endpoint elimina una solicitud de becas alumnos y devuelve un objeto que contiene los detalles del alumno eliminado.',
  params: {
    type: 'object',
    properties: {
      solicitudBecaAlumnoId: { type: 'integer' },
    },
    required: ['solicitudBecaAlumnoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...solicitudBecaAlumno,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = deleteSolicitudBecaAlumnoSchema;
