const { inspeccionInspeccionPregunta } = require('./properties/inspeccionInspeccionPreguntas');
const { responseProperties } = require('./properties/responseProperties');

const createInspeccionRespuestasSchema = {
  tags: ['Inspecciones'],
  description: 'Given an object with inspeccion-inspeccion-pregunta required data, then save a record of inspeccion-inspeccion-preguntas in database.',
  params: {
    type: 'object',
    properties: { inspeccionId: { type: 'integer' } },
    required: ['inspeccionId'],
  },
  body: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        ...inspeccionInspeccionPregunta,
      },
      required: ['inspeccionPreguntaId', 'respuesta'],
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          properties: {
            id: { type: 'integer' },
            ...inspeccionInspeccionPregunta,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspeccionRespuestasSchema;
