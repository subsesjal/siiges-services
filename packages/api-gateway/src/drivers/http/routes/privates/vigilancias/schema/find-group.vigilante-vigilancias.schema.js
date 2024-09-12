const { vigilanteVigilancia } = require('./properties/vigilanteVigilancia');
const { vigilancia } = require('./properties/vigilancia');
const { programa } = require('../../solicitudes/schema/properties/programa');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('./properties/responseProperties');

const findGroupVigilanteVigilanciasSchema = {
  tags: ['Vigilancias'],
  description: 'Find all vigilancias by vigilante id',
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
              ...vigilanteVigilancia,
              ...responseProperties,
              vigilancia: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  ...vigilancia,
                  ...responseProperties,
                  programa: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      ...programa,
                      ...responseProperties,
                      plantel: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          ...plantel,
                          ...responseProperties,
                          institucion: {
                            type: 'object',
                            properties: {
                              id: { type: 'integer' },
                              ...institucion,
                              ...responseProperties,
                            },
                          },
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
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findGroupVigilanteVigilanciasSchema;
