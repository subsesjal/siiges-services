const { seguridadSistema } = require('./properties/seguridadSistema');
const { responseProperties } = require('./properties/responseProperties');

const findAllSeguridadSistemasSchema = {
  tags: ['Plantel'],
  description: 'Return the list of seguridad sistemas.',
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
              ...seguridadSistema,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllSeguridadSistemasSchema;
