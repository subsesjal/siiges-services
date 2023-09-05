const { programa } = require('../../solicitudes/schema/properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');

const findInstitucionProgramasSchema = {
  tags: ['Programas'],
  description: 'Return a list of programs with institucionId params.',
  params: {
    title: 'Find Programs by institucionId',
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
    },
    required: ['institucionId'],
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

module.exports = findInstitucionProgramasSchema;
