const { programa } = require('../../solicitudes/schema/properties/programa');
const { plantel } = require('../../instituciones/schema/properties/plantel');
const { nivel } = require('../../grupos/schema/properties/nivel');
const { ciclo } = require('./properties/ciclo');
const { modalidad } = require('./properties/modalidad');
const { institucion } = require('../../instituciones/schema/properties/institucion');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { responseProperties } = require('../../instituciones/schema/properties/responseProperties');

const findOneProgramaSchema = {
  tags: ['Programa'],
  description: 'Return a Programa by providing a programaId.',
  params: {
    title: 'findOneProgramaSchema',
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
    },
    required: ['programaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...programa,
            ...responseProperties,
            nivel: {
              type: 'object',
              properties: {
                ...nivel,
                ...responseProperties,
              },
            },
            ciclo: {
              type: 'object',
              properties: {
                ...ciclo,
                ...responseProperties,
              },
            },
            modalidad: {
              type: 'object',
              properties: {
                ...modalidad,
                ...responseProperties,
              },
            },
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
};

module.exports = findOneProgramaSchema;
