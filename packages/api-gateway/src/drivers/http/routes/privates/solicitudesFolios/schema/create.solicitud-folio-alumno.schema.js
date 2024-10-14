const { responseProperties } = require('./properties/responseProperties');
const { solicitudFolioAlumno } = require('./properties/solicitudFolioAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');

const createAlumnoFolioSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Given an object with solicitud folio required data, then save the first time a new solicitudes_folios_alumnos in database.',
  params: {
    type: 'object',
    properties: {
      solicitudFolioId: { type: 'integer' },
      alumnoId: { type: 'integer' },
    },
    required: ['solicitudFolioId', 'alumnoId'],
  },
  body: {
    type: 'object',
    properties: {
      ...solicitudFolioAlumno,
    },
    required: ['fechaTerminacion', 'fechaElaboracion'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
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
          },
        },
      },
    },
  },
};

module.exports = createAlumnoFolioSchema;
