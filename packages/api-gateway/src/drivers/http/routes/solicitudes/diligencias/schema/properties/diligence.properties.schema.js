const diligence = {
  solicitudId: { type: 'integer' },
  personaId: { type: 'integer' },
  horaInicio: { type: 'string', format: 'date-time' },
  horaFin: { type: 'string', format: 'date-time' },
};

const diligenceResponse = {
  ...diligence,
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
  deletedAt: { type: 'string', format: 'date-time' },
};

module.exports = {
  diligence,
  diligenceResponse,
};
