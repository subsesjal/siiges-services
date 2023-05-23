const { inspeccionObservaciones } = require('./properties/inspeccionInspeccionPreguntas');
const { responseProperties } = require('./properties/responseProperties');

const createInspeccionObservacionSchema = {
  tags: ['Inspeccion'],
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
        ...inspeccionObservaciones,
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
            ...inspeccionObservaciones,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspeccionObservacionSchema;
