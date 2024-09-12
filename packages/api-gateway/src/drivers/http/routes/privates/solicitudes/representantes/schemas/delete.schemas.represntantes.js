const {
  representante,
  domicilioResponse,
  usuarioResponse,
  personaResponse,
  solicitudResponse,
} = require('./properties');

const deleteRepresentanteSchema = {
  tags: ['Representante'],
  description: 'Representante information delete',
  params: {
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
            solicitud: { ...solicitudResponse },
          },
        },
      },
    },
  },
};

module.exports = deleteRepresentanteSchema;
