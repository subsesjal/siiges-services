const { institucion } = require('./properties/institucion');
const { responseProperties } = require('./properties/responseProperties');

const getAllInstitucionesSchema = {
  tags: ['Institucion'],
  description: 'Return a list of instituciones.',
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
              ...institucion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = getAllInstitucionesSchema;
