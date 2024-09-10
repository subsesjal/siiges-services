const { inspeccion } = require('./properties/inspeccion');
const { responseProperties } = require('./properties/responseProperties');

const findAllInspeccionesSchema = {
  tags: ['Inspecciones'],
  description: 'Return the list of inspecciones.',
  querystring: {
    type: 'object',
    properties: {
      apartado: { type: 'number' },
    },
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
              id: { type: 'integer' },
              ...inspeccion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllInspeccionesSchema;
