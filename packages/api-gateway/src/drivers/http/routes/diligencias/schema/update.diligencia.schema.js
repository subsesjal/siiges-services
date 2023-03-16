const { diligencia } = require('./properties/diligencia');
const { persona } = require('../../usuarios/schema/properties/persona');
const { responseProperties } = require('./properties/responseProperties');

const updateDiligencias = {
  tags: ['Diligencias'],
  description: 'Given a diligenceId update a diligence',
  params: {
    title: 'update diligence',
    type: 'object',
    properties: {
      diligenciaId: { type: 'integer' },
    },
    required: ['diligenciaId'],
  },
  body: {
    title: 'getOneDiligence',
    type: 'object',
    properties: {
      ...diligencia,
      persona: {
        type: 'object',
        properties: {
          ...persona,
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

module.exports = updateDiligencias;
