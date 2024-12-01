const { solicitudRevEquiv } = require('./properties/solicitudRevEquiv');
const { institucionProcedencia } = require('./properties/institucionProcedencia');
const { institucionDestino } = require('./properties/institucionDestino');
const { responseProperties } = require('./properties/responseProperties');

const findAllEquivalenciasSchema = {
  tags: ['Solicitudes Rev Equiv'],
  description: 'Return a list of equivalencias.',
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
              ...solicitudRevEquiv,
              ...responseProperties,
              interesado: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  institucionProcedencia: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...institucionProcedencia,
                      ...responseProperties,
                    },
                  },
                  institucionDestino: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...institucionDestino,
                      ...responseProperties,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: 'No equivalencias found',
      type: 'object',
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

module.exports = findAllEquivalenciasSchema;
