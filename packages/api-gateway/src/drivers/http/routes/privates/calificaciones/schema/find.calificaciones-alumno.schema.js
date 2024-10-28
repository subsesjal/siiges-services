const { calificacion } = require('../../alumnos/schema/properties/calificacion');
const { grupo } = require('../../grupos/schema/properties/grupo');
const { grado } = require('../../grupos/schema/properties/grado');
const { cicloEscolar } = require('../../ciclosEscolares/schema/properties/cicloEscolar');
const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { responseProperties } = require('../../alumnos/schema/properties/responseProperties');

const findCalificacionesAlumnoSchema = {
  tags: ['Calificaciones'],
  description: 'Given alumno Id, returns his calificaciones',
  params: {
    type: 'object',
    properties: {
      alumnoId: { type: 'integer' },
    },
    required: ['alumnoId'],
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
              ...calificacion,
              ...responseProperties,
              asignatura: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...asignatura,
                  ...responseProperties,
                },
              },
              grupo: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...grupo,
                  ...responseProperties,
                  cicloEscolar: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...cicloEscolar,
                      ...responseProperties,
                    },
                  },
                  grado: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...grado,
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

module.exports = findCalificacionesAlumnoSchema;
