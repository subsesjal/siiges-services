const { saludInstitucion } = require('./properties/saludInstitucion');
const { responseProperties } = require('./properties/responseProperties');

const createSaludInstitucionSchema = {
  tags: ['Planteles'],
  description: 'Create a new Salud Instiucion',
  params: {
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
    },
    required: ['plantelId'],
  },
  body: {
    type: 'object',
    properties: {
      ...saludInstitucion,
    },
    required: ['nombre', 'tiempo'],
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
