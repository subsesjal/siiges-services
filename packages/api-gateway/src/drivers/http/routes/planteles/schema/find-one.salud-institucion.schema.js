const { saludInstitucion } = require('./properties/saludInstitucion');
const { responseProperties } = require('./properties/responseProperties');

const findOneSaludInstitucionSchema = {
  tags: ['Planteles'],
  description: 'Get one Salud Instiucion with institucionesSaludId params',
  params: {
    type: 'object',
    properties: {
      saludInstitucionId: { type: 'integer' },
      plantelId: { type: 'integer' },
    },
    required: ['plantelId', 'saludInstitucionId'],
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

module.exports = findOneSaludInstitucionSchema;
