const { catalogoCicloEscolar } = require('./properties/catalogoCicloEscolar');
const { responseProperties } = require('./properties/responseProperties');

const createCatalogoCicloEscolarSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Create a Ciclo Escolar catalog record.',
  body: {
    type: 'object',
    properties: {
      nombre: { type: 'string', maxLength: 5 },
      descripcion: { type: 'string' },
    },
    required: ['nombre'],
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
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
};

module.exports = { createCatalogoCicloEscolarSchema };
