const { responseProperties } = require('./properties/responseProperties');
const { solicitudFolioAlumno } = require('./properties/solicitudFolioAlumno');
const { alumno } = require('../../alumnos/schema/properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');

const createAlumnoFolioSchema = {
  tags: ['Solicitudes Folios'],
  description: 'Given an array of alumnos, save them as solicitudes_folios_alumnos in database.',
  params: {
    type: 'object',
    properties: {
      solicitudFolioId: { type: 'integer' },
    },
    required: ['solicitudFolioId'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        alumnoId: { type: 'integer' },
        ...solicitudFolioAlumno,
      },
      required: ['alumnoId', 'fechaTerminacion'],
    },
    minItems: 1,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            agregados: { type: 'integer' },
            rechazados: { type: 'integer' },
            resultados: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  alumnoId: { type: 'integer' },
                  estatus: { type: 'string' },
                  mensaje: { type: 'string' },
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
      },
    },
  },
};

module.exports = createAlumnoFolioSchema;
