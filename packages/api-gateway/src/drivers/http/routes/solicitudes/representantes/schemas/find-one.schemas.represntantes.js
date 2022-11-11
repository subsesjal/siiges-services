const {
  representante,
  domicilioResponse,
  usuarioResponse,
  personaResponse,
  solicitudResponse,
} = require('./properties');

const findRepresentanteProgramaSchema = {
  tags: ['Representante'],
  description: 'Representante information finder',
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

module.exports = findRepresentanteProgramaSchema;
