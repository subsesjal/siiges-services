// Calificacion
const calificacion = {
  alumnoId: { type: 'integer' },
  grupoId: { type: 'integer' },
  periodoFechaInicio: {
    type: 'string',
    format: 'date',
  },
  periodoFechaFin: {
    type: 'string',
    format: 'date',
  },
};

module.exports = { calificacion };
