const { ejeServicioSocial } = require('./properties/ejeServicioSocial');
const { responseProperties } = require('./properties/responseProperties');

const findAllEjesServSocSchema = {
  tags: ['Ejes Servicio Social'],
  description: 'Obtiene una lista de todos los ejes x dimension ID de servicio social.',
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
              ...ejeServicioSocial,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllEjesServSocSchema;
