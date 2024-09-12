const { responseProperties } = require('./properties/responseProperties');
const { inspeccion } = require('./properties/inspeccion');

const deleteOneInspecciones = {
  tags: ['Inspecciones'],
  description: 'Given a inspeccionId delete a inspeccion',
  params: {
    title: 'delete inspeccion',
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
};

module.exports = deleteOneInspecciones;
