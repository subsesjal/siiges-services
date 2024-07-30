const { responseProperties } = require('./properties/responseProperties');
const { solicitudFolioAlumno } = require('./properties/solicitudFolioAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');

const findAllSolicitudFolioAlumnoSchema = {
  tags: ['Alumnos de una Solicitud de Folios'],
  description: 'Return a list of alumnos de una solicitud de folios.',
  params: {
    type: 'object',
    properties: {
      solicitudFolioId: { type: 'integer' },
    },
    required: ['solicitudFolioId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
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
  },
};

module.exports = findAllSolicitudFolioAlumnoSchema;
