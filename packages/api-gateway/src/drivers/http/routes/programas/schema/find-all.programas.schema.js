const { programa } = require('../../solicitudes/schema/properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');

const findAllProgramasSchema = {
  tags: ['Programas'],
  description: 'Return a list of programs.',
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

module.exports = findAllProgramasSchema;
