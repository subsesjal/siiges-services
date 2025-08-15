const equivalenciaInterna = {
  alumnoId: { type: 'integer' },
  folioExpediente: { type: 'string' },
  folioResolucion: { type: 'integer' },
  fechaResolucion: { type: 'string', format: 'date' },
};

module.exports = { equivalenciaInterna };
