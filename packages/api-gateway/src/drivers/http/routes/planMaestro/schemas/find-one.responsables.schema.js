const { responseProperties } = require('../../orgColegiados/schema/properties/responseProperties');
const { planMaestro } = require('./properties/planMaestro');
const { responsable } = require('./properties/responsables');

const findOneResponsablesSchema = {
  tags: ['Planes Maestros'],
  description: 'find responsables.',
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
            responsablePlaneacion: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...responsable,
                ...responseProperties,
              },
            },
            responsableObra: {
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
