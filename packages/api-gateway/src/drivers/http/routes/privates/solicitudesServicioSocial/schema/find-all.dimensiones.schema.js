const { dimensionServicioSocial } = require('./properties/dimensionServicioSocial');
const { responseProperties } = require('./properties/responseProperties');

const findAllDimensionesServSocSchema = {
  tags: ['Dimensiones Servicio Social'],
  description: 'Obtiene una lista de todas las dimensiones de servicio social.',
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
              ...dimensionServicioSocial,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllDimensionesServSocSchema;
