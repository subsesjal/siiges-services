const { diligenciasResponse, personaResponse } = require('./properties');

const findOneDiligencias = {
  tags: ['Diligence'],
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
            ...diligenciasResponse,
            persona: { ...personaResponse },
          },
        },
      },
    },
  },
};

module.exports = findOneDiligencias;
