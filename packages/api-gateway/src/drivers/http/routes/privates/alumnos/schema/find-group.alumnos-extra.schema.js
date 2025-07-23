const { calificacion } = require('./properties/calificacion');
const { alumno } = require('./properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { asignatura } = require('../../asignaturas/schema/properties/asignatura');
const { grado } = require('../../grupos/schema/properties/grado');
const { responseProperties } = require('./properties/responseProperties');

const findGroupAlumnosExtraSchema = {
  tags: ['Reportes'],
  description: 'Return an array of calificaciones extra grouped by ciclo escolar id.',
  params: {
    title: 'findGroupAlumnosExtraSchema',
    type: 'object',
    properties: { cicloEscolarId: { type: 'integer' } },
    required: ['cicloEscolarId'],
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
              asignatura: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...asignatura,
                  ...responseProperties,
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

module.exports = findGroupAlumnosExtraSchema;
