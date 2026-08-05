const { catalogoCicloEscolar, updateCatalogoCicloEscolarBody } = require('./properties/catalogoCicloEscolar');
const { responseProperties } = require('./properties/responseProperties');

const updateCatalogoCicloEscolarSchema = {
  tags: ['Ciclo Escolar'],
  description: 'Update a Ciclo Escolar catalog record.',
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
    },
    required: ['id'],
  },
  body: {
    type: 'object',
    properties: updateCatalogoCicloEscolarBody,
    minProperties: 1,
    additionalProperties: false,
  },
  response: {
    200: {
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

module.exports = { updateCatalogoCicloEscolarSchema };
