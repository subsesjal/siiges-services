const { responseProperties } = require('./properties/responseProperties');
const { solicituFolioAlumno } = require('./properties/solicitudFolioAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');

const createAlumnoFolioSchema = {
  tags: ['Agregar una solicitud folio a un alumno'],
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
      fechaTermino: { type: 'string', format: 'date-time' },
      fechaElaboracion: { type: 'string', format: 'date-time' },
    },
    required: ['fechaTermino', 'fechaElaboracion'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...solicituFolioAlumno,
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

module.exports = createAlumnoFolioSchema;
