const planMaestro = {
  institucionId: { type: 'integer' },
  periodoId: { type: 'integer' },
  sesionId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
};

module.exports = { planMaestro };
