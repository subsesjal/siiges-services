const { saludInstitucion } = require('./properties/saludInstitucion');
const { responseProperties } = require('./properties/responseProperties');

const findPlantelSaludInstitucionSchema = {
  tags: ['Planteles'],
  description: 'Get a list Salud Instiucion with plantelId params',
  params: {
    type: 'object',
    properties: {
      plantelId: { type: 'integer' },
    },
    required: ['plantelId'],
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
              ...saludInstitucion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findPlantelSaludInstitucionSchema;
