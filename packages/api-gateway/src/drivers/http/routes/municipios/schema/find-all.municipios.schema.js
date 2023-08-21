const { municipio } = require('./properties/municipio');
const { responseProperties } = require('./properties/responseProperties');

const findAllMunicipiosSchema = {
  tags: ['Municipio'],
  description: 'Return a list of municipios.',
  querystring: {
    type: 'object',
    properties: {
      estadoId: { type: 'number' },
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
              usuarioId: { type: 'integer' },
              ...municipio,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllMunicipiosSchema;
