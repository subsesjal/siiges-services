const { programa } = require('../../solicitudes/schema/properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');

const findPlantelProgramasSchema = {
  tags: ['Programas'],
  description: 'Return a list of programs with plantelId params.',
  params: {
    title: 'Find One Programa',
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
          properties: {
            ...programa,
            ...plantel,
            ...domicilio,
          },
        },
      },
    },
  },
};

module.exports = findPlantelProgramasSchema;
