const { vigilanciaPreguntas } = require('./properties/vigilanciaPreguntas');
const { responseProperties } = require('./properties/responseProperties');

const findAllPreguntasSchema = {
  tags: ['Vigilancias'],
  description: 'Return the list of preguntas.',
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
              ...vigilanciaPreguntas,
              vigilanciaApartado: { type: 'object', properties: { nombre: { type: 'string' } } },
              vigilanciaCategoria: { type: 'object', properties: { nombre: { type: 'string' }, instruccion: { type: 'string' } } },
              vigilanciaTipoPregunta: { type: 'object', properties: { nombre: { type: 'string' } } },
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllPreguntasSchema };
