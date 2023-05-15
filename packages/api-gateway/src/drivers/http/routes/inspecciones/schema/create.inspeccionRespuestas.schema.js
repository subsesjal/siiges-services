const { inspeccionRespuestas } = require('./properties/inspeccionInspeccionPreguntas');
const { responseProperties } = require('./properties/responseProperties');

const createInspeccionRespuestasSchema = {
  tags: ['InspeccionRespuestas'],
  description: 'Given an object with inspeccion-Inspeccion-pregunta required data, then save a record of inspeccion-Inspeccion-preguntas in database.',
  body: {
    type: 'object',
    properties: {
      ...inspeccionRespuestas,
    },
    required: ['inspeccionId', 'inspeccionPreguntaId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...inspeccionRespuestas,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspeccionRespuestasSchema;
