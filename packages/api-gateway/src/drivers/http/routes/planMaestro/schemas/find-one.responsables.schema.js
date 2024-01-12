const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { planMaestro } = require('./properties/planMaestro');
const { responsable } = require('./properties/responsables');

const findOneResponsablesSchema = {
  tags: ['Planes Maestros'],
  description: 'findOne responsables.',
  params: {
    type: 'object',
    properties: {
      planMaestroId: { type: 'integer' },
    },
    required: ['planMaestroId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...planMaestro,
            planeaciones: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...responsable,
                ...responseProperties,
              },
            },
            obrasYMantenimientos: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...responsable,
                ...responseProperties,
              },
            },
            ...responseProperties,
          },
        },
      },
    },
  },
};

module.exports = { findOneResponsablesSchema };
