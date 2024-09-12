const { diligencia } = require('./properties/diligencia');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const findOneDiligencias = {
  tags: ['Diligencias'],
  description: 'Given a diligenceId get a diligence',
  params: {
    title: 'getOneDiligence',
    type: 'object',
    properties: {
      diligenceId: { type: 'integer' },
    },
    required: ['diligenciaId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...diligencia,
            ...responseProperties,
            persona: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                ...persona,
                ...responseProperties,
              },
            },
          },
        },
      },
    },
  },
};

module.exports = findOneDiligencias;
