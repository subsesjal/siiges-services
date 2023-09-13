const { programa } = require('./properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('../../instituciones/schema/properties/responseProperties');

const findAllProgramasSchema = {
  tags: ['Programas'],
  description: 'Return a list of programs.',
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
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
      },
    },
  },
};

module.exports = findAllProgramasSchema;
