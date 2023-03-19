// Diligencia
const diligencia = {
  solicitudId: { type: 'integer' },
  personaId: { type: 'integer' },
  horaInicio: { type: 'string', format: 'date-time' },
  horaFin: { type: 'string', format: 'date-time' },
};

module.exports = { diligencia };
