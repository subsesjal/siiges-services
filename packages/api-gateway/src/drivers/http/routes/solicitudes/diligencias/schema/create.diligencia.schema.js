const { diligence, diligenceResponse } = require('./properties');

const createDiligence = {
  tags: ['Diligence'],
  description: 'Given a solicitudId create a diligence',
  body: {
    title: 'getOneDiligence',
    type: 'object',
    properties: {
      ...diligence,
    },
    required: ['solicitudId', 'personaId', 'horaInicio', 'horaFin'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            ...diligenceResponse,
          },
        },
      },
    },
  },
};

module.exports = createDiligence;
