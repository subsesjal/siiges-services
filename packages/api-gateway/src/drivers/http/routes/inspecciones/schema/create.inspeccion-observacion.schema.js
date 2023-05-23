const { inspeccionInspeccionObservacion } = require('./properties/inspeccionInspeccionPreguntas');
const { responseProperties } = require('./properties/responseProperties');

const createInspeccionObservacionSchema = {
  tags: ['Inspeccion Observacion'],
  description: 'Save a record of inspeccion-observacion in database.',
  params: {
    type: 'object',
    properties: { inspeccionId: { type: 'integer' } },
    required: ['inspeccionId'],
  },
  body: {
    type: 'object',
    items: {
      properties: {
        ...inspeccionInspeccionObservacion,
      },
      required: ['inspeccionApartadoId', 'comentario'],
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...inspeccionInspeccionObservacion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspeccionObservacionSchema;
