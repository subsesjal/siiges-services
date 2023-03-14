const { diligencias, diligenciasResponse } = require('./properties');

const createDiligencias = {
  tags: ['Diligence'],
  description: 'Given a solicitudId create a diligence',
  body: {
    title: 'getOneDiligence',
    type: 'object',
    properties: {
      ...diligencias,
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
            ...diligenciasResponse,
          },
        },
      },
    },
  },
};

module.exports = createDiligencias;
