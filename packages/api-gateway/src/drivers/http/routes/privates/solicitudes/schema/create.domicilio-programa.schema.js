const createDomicilioSolicitudProgramaSchema = {
  tags: ['Solicitudes'],
  description: 'Given an object with solicitud and programa required data, then save the first time a new solicitud in database.',
  params: {
    title: 'updateSolcitudSeccionObservacionSchema',
    type: 'object',
    properties: {
      programaId: { type: 'integer' },
      plantelId: { type: 'integer' },
    },
  },
  body: {
    type: 'object',
    properties: {
      usuarioId: { type: 'integer' },
    },
  },
};

module.exports = { createDomicilioSolicitudProgramaSchema };
