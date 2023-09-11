const { saludInstiucion } = require('./properties/saludInstiucion');
const { responseProperties } = require('./properties/responseProperties');

const findOneSaludInstiucionSchema = {
  tags: ['Instituciones'],
  description: 'Get one Salud Instiucion with institucionesSaludId params',
  params: {
    type: 'object',
    properties: {
      institucionesSaludId: { type: 'integer' },
    },
    required: ['institucionesSaludId'],
  },
  response: {
    200: {
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

module.exports = findOneSaludInstiucionSchema;
