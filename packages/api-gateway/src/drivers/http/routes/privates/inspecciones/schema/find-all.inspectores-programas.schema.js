const { persona } = require('../../usuarios/schema/properties/persona');
const { inspector } = require('./properties/inspector');
const { responseProperties } = require('./properties/responseProperties');

const findAllInspectoresProgramasSchema = {
  tags: ['Inspecciones'],
  description: 'Find all inspectores with programas inspected',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...inspector,
              inspeccionesCompletadas: { type: 'integer' },
              inspeccionesPendientes: { type: 'integer' },
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
};

module.exports = findAllInspectoresProgramasSchema;
