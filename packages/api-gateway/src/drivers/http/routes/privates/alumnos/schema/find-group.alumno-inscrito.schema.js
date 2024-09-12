const { alumno } = require('./properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');
const { calificacion } = require('./properties/calificacion');

const findAlumnosInscritosSchema = {
  tags: ['Alumnos'],
  description: 'Return an array of Alumnos signed up grouped by Grupo.',
  params: {
    title: 'findAlumnosInscritosSchema',
    type: 'object',
    properties: {
      grupoId: { type: 'integer' },
    },
    required: ['grupoId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            properties: {
              alumnoId: { type: 'integer' },
              grupoId: { type: 'integer' },
              alumno: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...alumno,
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
              alumnoAsignaturas: {
                type: 'array',
                items: {
                  properties: {
                    id: { type: 'integer' },
                    ...calificacion,
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

module.exports = { findAlumnosInscritosSchema };
