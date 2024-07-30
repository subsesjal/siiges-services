const { solicitudFolioAlumno } = require('./properties/solicitudFolioAlumno');
const { responseProperties } = require('./properties/responseProperties');
const { alumno } = require('../../alumnos/schema/properties/alumno');
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
      ...solicitudFolioAlumno,
    },
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...solicitudFolioAlumno,
            ...responseProperties,
            alumno: {
              type: 'object',
              properties: {
                ...alumno,
                ...responseProperties,
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
