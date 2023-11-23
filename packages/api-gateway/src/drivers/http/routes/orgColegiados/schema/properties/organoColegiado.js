const organoColegiado = {
  institucionId: { type: 'integer' },
  sesionId: { type: 'integer' },
  periodoId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
};

module.exports = { organoColegiado };
