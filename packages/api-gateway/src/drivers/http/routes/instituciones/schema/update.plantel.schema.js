const { plantel } = require('./properties/plantel');
const { domicilio } = require('../../usuarios/schema/properties/domicilio');
const { municipio } = require('../../usuarios/schema/properties/municipio');
const { estado } = require('../../usuarios/schema/properties/estado');
const { responseProperties } = require('./properties/responseProperties');

const updatePlantelSchema = {
  tags: ['Plantel'],
  description: 'Given an object with plantel data, then update a plantel in database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      plantelId: { type: 'integer' },
    },
    required: ['institucionId', 'plantelId'],
  },
  body: {
    type: 'object',
    properties: {
      ...plantel,
      domicilio: {
        type: 'object',
        properties: {
          ...domicilio,
        },
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...plantel,
            ...responseProperties,
            domicilio: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...domicilio,
                ...responseProperties,
                municipio: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...municipio,
                    ...responseProperties,
                  },
                },
                estado: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    ...estado,
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

module.exports = updatePlantelSchema;
