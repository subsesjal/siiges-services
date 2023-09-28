const { saludInstiucion } = require('./properties/saludInstiucion');
const { responseProperties } = require('./properties/responseProperties');

const createSaludInstiucionSchema = {
  tags: ['Planteles'],
  description: 'Create a new Salud Instiucion',
  body: {
    type: 'object',
    properties: {
      ...saludInstiucion,
    },
    required: ['plantelId', 'nombre', 'tiempo'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...saludInstiucion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createSaludInstiucionSchema;
