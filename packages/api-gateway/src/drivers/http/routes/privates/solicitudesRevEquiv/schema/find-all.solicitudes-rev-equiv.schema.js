const { solicitudRevEquiv } = require('./properties/solicitudRevEquiv');
const { interesado } = require('./properties/interesado');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { persona } = require('../../usuarios/schema/properties/persona');
const { institucionProcedencia } = require('./properties/institucionProcedencia');
const { institucionDestino } = require('./properties/institucionDestino');
const { responseProperties } = require('./properties/responseProperties');

const findAllSolicitudesRevEquivSchema = {
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
                  ...interesado,
                  ...responseProperties,
                  persona: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...persona,
                      ...responseProperties,
                      domicilio: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          ...domicilio,
                          ...responseProperties,
                        },
                      },
                    },
                  },
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

module.exports = findAllSolicitudesRevEquivSchema;
