const { programa } = require('./properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('../../instituciones/schema/properties/responseProperties');

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

module.exports = findInstitucionProgramasSchema;
