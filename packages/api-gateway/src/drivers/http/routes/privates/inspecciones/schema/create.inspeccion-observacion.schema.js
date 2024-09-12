const { inspeccionObservacion } = require('./properties/inspeccionObservacion');
const { responseProperties } = require('./properties/responseProperties');

const createInspeccionObservacionSchema = {
  tags: ['Inspecciones'],
  description: 'Save a record of inspeccion-observacion in database.',
  params: {
    type: 'object',
    properties: {
      inspeccionId: { type: 'integer' },
    },
    required: ['inspeccionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...inspeccionObservacion,
    },
    required: ['inspeccionApartadoId', 'comentario'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...inspeccionObservacion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspeccionObservacionSchema;
