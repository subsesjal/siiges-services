const { solicitudFolioAlumno } = require('./properties/solicitudFolioAlumno');
const { responseProperties } = require('./properties/responseProperties');

const deleteAlumnoSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Delete alumno solicitud folios.',
  params: {
    type: 'object',
    properties: {
      solicitudFolioAlumnoId: { type: 'integer' },
    },
    required: ['solicitudFolioAlumnoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...solicitudFolioAlumno,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = deleteAlumnoSchema;
