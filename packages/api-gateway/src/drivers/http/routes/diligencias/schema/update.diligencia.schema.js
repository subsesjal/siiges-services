const { diligencias, diligenciasResponse } = require('./properties');

const updateDiligencias = {
  tags: ['Diligence'],
  description: 'Given a diligenceId update a diligence',
  params: {
    title: 'update diligence',
    type: 'object',
    properties: {
      diligenceId: { type: 'integer' },
    },
    required: ['diligenciaId'],
  },
  body: {
    title: 'getOneDiligence',
    type: 'object',
    properties: {
      ...diligencias,
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
            ...diligenciasResponse,
          },
        },
      },
    },
  },
};

module.exports = updateDiligencias;
