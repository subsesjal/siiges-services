const { nivel } = require('../../../privates/grupos/schema/properties/nivel');
const { responseProperties } = require('./properties/responseProperties');

const findAllNivelesSchema = {
  tags: ['Niveles académicos'],
  description: 'Devuelve una lista de objetos de niveles educativos registrados en el sistema',
  querystring: {
    type: 'object',
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
              ...nivel,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllNivelesSchema;
