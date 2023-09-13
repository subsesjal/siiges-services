const { saludInstiucion } = require('./properties/saludInstiucion');
const { responseProperties } = require('./properties/responseProperties');

const deleteSaludInstiucionSchema = {
  tags: ['Instituciones'],
  description: 'Delete a Salud Instiucion with institucionesSaludId params',
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

module.exports = deleteSaludInstiucionSchema;
