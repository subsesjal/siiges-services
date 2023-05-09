const { inspeccionInspeccionPregunta } = require('./properties/inspeccionInspeccionPreguntas');
const { responseProperties } = require('./properties/responseProperties');

const createInspeccionInspeccionPreguntasSchema = {
  tags: ['Inspeccion'],
  description: 'Given an object with inspeccion-pregunta required data, then save a record of inspeccion-preguntas in database.',
  body: {
    type: 'object',
    properties: {
      ...inspeccionInspeccionPregunta,
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
            ...inspeccionInspeccionPregunta,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspeccionInspeccionPreguntasSchema;
