const { saludInstiucion } = require('./properties/saludInstiucion');
const { responseProperties } = require('./properties/responseProperties');

const findPlantelSaludInstiucionSchema = {
  tags: ['Instituciones'],
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
              ...saludInstiucion,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findPlantelSaludInstiucionSchema;
