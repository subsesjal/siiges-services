const { alumno } = require('./properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { situacion } = require('./properties/situacion');
const { calificacion } = require('./properties/calificacion');
const { responseProperties } = require('./properties/responseProperties');

const findAlumnosGrupoSchema = {
  tags: ['Alumnos'],
  description: 'Return an array of Alumnos grouped by grupo and asignatura.',
  params: {
    title: 'findAlumnosGrupoSchema',
    type: 'object',
    properties: {
      grupoId: { type: 'integer' },
      asignaturaId: { type: 'integer' },
    },
    required: ['grupoId', 'asignaturaId'],
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
              situacion: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...situacion,
                  ...responseProperties,
                },
              },
              calificaciones: {
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

module.exports = findAlumnosGrupoSchema;
