const equivalenciaInterna = {
  alumnoId: { type: 'integer' },
  folioExpediente: { type: 'string' },
  folioResolucion: { type: 'integer' },
  fechaResolucion: { type: 'string' }, // Cambio de date format
};

module.exports = { equivalenciaInterna };
