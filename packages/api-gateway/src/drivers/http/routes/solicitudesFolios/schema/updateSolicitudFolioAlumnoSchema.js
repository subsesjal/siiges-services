const { solicitudFolioAlumnos } = require('./properties/solicitudFolioAlumnos');
const { responseProperties } = require('./properties/responseProperties');
const { persona } = require('../../usuarios/schema/properties/persona');

const updateSolicitudFolioAlumnoSchema = {
  tags: ['SolicitudesFoliosAlumnos'],
  description: 'Update an existing record in solicitudes_folios_alumnos table with new dates.',
  params: {
    title: 'updateSolicitudFolioAlumnoSchema',
    type: 'object',
    properties: {
      solicitudFolioAlumnoId: { type: 'integer' },
    },
    required: ['solicitudFolioAlumnoId'],
  },
  body: {
    type: 'object',
    properties: {
      fechaTermino: { type: 'string', format: 'date-time' },
      fechaElaboracion: { type: 'string', format: 'date-time' },
    },
    required: ['fechaTermino', 'fechaElaboracion'],
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...solicitudFolioAlumnos,
            ...responseProperties,
            alumno: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                persona: {
                  type: 'object',
                  properties: {
                    ...persona,
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

module.exports = updateSolicitudFolioAlumnoSchema;
