const { responseProperties } = require('./properties/responseProperties');
const { tipoInstitucion } = require('./properties/tipoInstitucion');

const findAllTipoInstitucionesSchema = {
  tags: ['TipoInstitucion'],
  description: 'Return a list of tipo instituciones with name and description.',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ...tipoInstitucion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllTipoInstitucionesSchema;
