const { inspeccionPreguntas } = require('./properties/inspeccionPreguntas');
const { responseProperties } = require('./properties/responseProperties');

const findAllInspeccionPreguntasSchema = {
  tags: ['Inspecciones'],
  description: 'Return the list of inspeccion-preguntas.',
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
              ...inspeccionPreguntas,
              inspeccionApartado: { type: 'object', properties: { nombre: { type: 'string' } } },
              inspeccionCategoria: { type: 'object', properties: { nombre: { type: 'string' }, instruccion: { type: 'string' } } },
              inspeccionTipoPregunta: { type: 'object', properties: { nombre: { type: 'string' } } },
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllInspeccionPreguntasSchema;
