const {
  representante,
  domicilioResponse,
  usuarioResponse,
  personaResponse,
} = require('./properties');

const createSolicitudProgramaSchema = {
  tags: ['Representante'],
  description: 'Representante update information',
  params: {
    type: 'object',
    properties: { ...representante },
    required: ['usuarioId', 'solicitudId'],
  },
  body: {
    type: 'object',
    properties: { ...representante },
    required: ['usuarioId', 'solicitudId'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            persona: { ...personaResponse },
            usuario: { ...usuarioResponse },
            domicilio: { ...domicilioResponse },
          },
        },
      },
    },
  },
};

module.exports = createSolicitudProgramaSchema;
