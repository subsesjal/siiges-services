const { saludInstiucion } = require('./properties/saludInstiucion');
const { responseProperties } = require('./properties/responseProperties');

const updateSaludInstiucionSchema = {
  tags: ['Instituciones'],
  description: 'update a Salud Instiucion with institucionesSaludId params',
  params: {
    type: 'object',
    properties: {
      institucionesSaludId: { type: 'integer' },
    },
    required: ['institucionesSaludId'],
  },
  body: {
    type: 'object',
    properties: {
      ...saludInstiucion,
    },
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

module.exports = updateSaludInstiucionSchema;
