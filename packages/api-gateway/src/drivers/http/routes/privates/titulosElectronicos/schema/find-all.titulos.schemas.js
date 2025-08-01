const { tituloElectronico } = require('./properties/tituloElectronico');
const { responseProperties } = require('./properties/responseProperties');

const findAllTitulos = {
  tags: ['Titulos Electronicos'],
  description: 'Get a list Titulos Electronicos',
  querystring: {
    type: 'object',
    properties: { numeroRvoe: { type: 'string' } },
    required: ['numeroRvoe'],
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
              ...tituloElectronico,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findAllTitulos };
