const { saludInstitucion } = require('./properties/saludInstitucion');
const { responseProperties } = require('./properties/responseProperties');

const deleteSaludInstitucionSchema = {
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
            ...saludInstitucion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = deleteSaludInstitucionSchema;
