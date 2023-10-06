const grupos = {
  cicloEscolarId: { type: 'integer' },
  turnoId: { type: 'integer' },
  gradoId: { type: 'integer' },
  descripcion: { type: 'string' },
  generacion: { type: 'string' },
  generacionFechaInicio: { type: 'string', format: 'date-time' },
  generacionFechaFin: { type: 'string', format: 'date-time' },
};

module.exports = { grupos };
