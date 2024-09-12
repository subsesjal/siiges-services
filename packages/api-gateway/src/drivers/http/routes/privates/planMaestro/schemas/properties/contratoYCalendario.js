const contratoYContrato = {
  numeroDeContrato: { type: 'string' },
  fechaInicio: { type: 'string', format: 'date-time' },
  fechaFin: { type: 'string', format: 'date-time' },
  contratista: { type: 'string' },
};

module.exports = { contratoYContrato };
