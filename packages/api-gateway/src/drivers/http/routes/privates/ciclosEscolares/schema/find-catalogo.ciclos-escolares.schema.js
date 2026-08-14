const { catalogoCicloEscolar } = require('./properties/catalogoCicloEscolar');
const { responseProperties } = require('./properties/responseProperties');

const findCatalogoCicloEscolarSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Get the Ciclo Escolar catalog.',
  querystring: {
    type: 'object',
    properties: {
      all: { type: 'string', enum: ['true', 'false'] },
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
              ...catalogoCicloEscolar,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = { findCatalogoCicloEscolarSchema };
