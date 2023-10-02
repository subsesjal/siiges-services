const { saludInstitucion } = require('./properties/saludInstitucion');
const { responseProperties } = require('./properties/responseProperties');

const createSaludInstitucionSchema = {
  tags: ['Planteles'],
  description: 'Create a new Salud Instiucion',
  body: {
    type: 'object',
    properties: {
      ...saludInstitucion,
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
            ...saludInstitucion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = createSaludInstitucionSchema;
