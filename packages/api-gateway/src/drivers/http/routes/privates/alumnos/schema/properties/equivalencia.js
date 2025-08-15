// Equivalencia
const equivalencia = {
  alumnoId: { type: 'integer' },
  folioExpediente: { type: 'string' },
  folioResolucion: { type: 'string' },
  fechaResolucion: { type: 'string', format: 'date' },
};

module.exports = { equivalencia };
