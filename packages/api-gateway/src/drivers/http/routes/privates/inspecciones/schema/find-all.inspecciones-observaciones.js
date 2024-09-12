const { responseProperties } = require('./properties/responseProperties');
const { inspeccionObservacion } = require('./properties/inspeccionObservacion');

const findAllInspeccionObservacionesSchema = {
  tags: ['Inspecciones'],
  description: 'Find one a inspection comments',
  params: {
    title: 'find One inspection comments',
    type: 'object',
    properties: {
      inspeccionId: { type: 'integer' },
    },
    required: ['inspeccionId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ...inspeccionObservacion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllInspeccionObservacionesSchema;
