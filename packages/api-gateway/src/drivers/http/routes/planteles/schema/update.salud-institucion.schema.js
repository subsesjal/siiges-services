const { saludInstitucion } = require('./properties/saludInstitucion');
const { responseProperties } = require('./properties/responseProperties');

const updateSaludInstitucionSchema = {
  tags: ['Planteles'],
  description: 'update a Salud Instiucion with institucionesSaludId params',
  params: {
    type: 'object',
    properties: {
      saludInstitucionId: { type: 'integer' },
      plantelId: { type: 'integer' },
    },
    required: ['plantelId', 'saludInstitucionId'],
  },
  body: {
    type: 'object',
    properties: {
      ...saludInstitucion,
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
            ...saludInstitucion,
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = updateSaludInstitucionSchema;
