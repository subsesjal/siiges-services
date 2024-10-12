const { programa } = require('../../solicitudes/schema/properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('../../instituciones/schema/properties/responseProperties');

const findAllProgramasSchema = {
  tags: ['Programas'],
  description: 'Return a list of programs or a specific program if acuerdoRvoe is provided.',
  querystring: {
    type: 'object',
    properties: {
      acuerdoRvoe: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          if: {
            type: 'array',
          },
          then: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...programa,
                plantel: {
                  type: 'object',
                  properties: {
                    ...plantel,
                    institucion: {
                      type: 'object',
                      properties: {
                        ...institucion,
                      },
                    },
                    domicilio: {
                      type: 'object',
                      properties: {
                        ...domicilio,
                      },
                    },
                  },
                },
                ...responseProperties,
              },
            },
          },
          else: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              ...programa,
              ...responseProperties,
            },
          },
        },
      },
    },
  },
};

module.exports = findAllProgramasSchema;
