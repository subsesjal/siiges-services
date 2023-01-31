const { plantel } = require('./properties/plantel');
const { director } = require('./properties/director');
const { domicilio } = require('./properties/domicilio');
const { municipio } = require('./properties/municipio');
const { estado } = require('./properties/estado');
const { responseProperties } = require('./properties/responseProperties');

const findOnePlantelSchema = {
  tags: ['Plantel'],
  description: 'Given a plantel id and a institucion id, then return a plantel from database.',
  params: {
    type: 'object',
    properties: {
      institucionId: { type: 'integer' },
      plantelId: { type: 'integer' },
    },
    required: ['institucionId', 'plantelId'],
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
            director: {
              type: 'array',
              properties: {
                id: { type: 'integer' },
                ...director,
                ...responseProperties,
              },
            },
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

module.exports = findOnePlantelSchema;
