const { representante, representanteCreateResponse } = require('./properties');

const createSolicitudProgramaSchema = {
  tags: ['Representante'],
  description: 'Given object with usuarioId and solicitudId, then save it to the db.',
  body: {
    type: 'object',
    properties: { ...representante },
    required: ['usuarioId', 'solicitudId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            ...representanteCreateResponse,
          },
        },
      },
    },
  },
};

module.exports = createSolicitudProgramaSchema;
