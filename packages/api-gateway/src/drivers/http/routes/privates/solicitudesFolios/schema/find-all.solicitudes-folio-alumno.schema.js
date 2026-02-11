const { responseProperties } = require('./properties/responseProperties');
const { solicitudFolioAlumno } = require('./properties/solicitudFolioAlumno');
const { folioDocumentoAlumno } = require('./properties/folioDocumentoAlumno');
const { foja } = require('./properties/foja');
const { libro } = require('./properties/libro');
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
              id: { type: 'integer' },
              fechaExpedicion: { type: 'string', format: 'date-time' },
              ...solicitudFolioAlumno,
              ...responseProperties,
              alumno: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...alumno,
                  ...responseProperties,
                  persona: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...persona,
                      ...responseProperties,
                    },
                  },
                },
              },
              folioDocumentoAlumno: {
                type: ['object', 'null'],
                properties: {
                  id: { type: 'integer' },
                  ...folioDocumentoAlumno,
                  ...responseProperties,
                  foja: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...foja,
                      ...responseProperties,
                    },
                  },
                  libro: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...libro,
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
