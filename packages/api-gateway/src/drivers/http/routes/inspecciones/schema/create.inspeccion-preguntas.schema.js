const { inspeccionPreguntas } = require('./properties/inspeccionPreguntas');
const { responseProperties } = require('./properties/responseProperties');

const createInspeccionPreguntasSchema = {
  tags: ['Inspeccion'],
  description: 'Given an object with inspeccion-pregunta required data, then save a record of inspeccion-preguntas in database.',
  body: {
    type: 'object',
    properties: {
      ...inspeccionPreguntas,
    },
    required: ['inspeccionTipoPreguntaId', 'inspeccionApartadoId', 'inspeccionCategoriaId', 'pregunta'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...inspeccionPreguntas,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createInspeccionPreguntasSchema;
