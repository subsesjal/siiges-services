const { calificacion } = require('./properties/calificacion');
const { alumno } = require('./properties/alumno');
const { persona } = require('../../usuarios/schema/properties/persona');
const { situacion } = require('./properties/situacion');
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
    },
  },
};

module.exports = findGroupAlumnosExtraSchema;
