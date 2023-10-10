const grupo = {
  cicloEscolarId: { type: 'integer' },
  turnoId: { type: 'integer' },
  gradoId: { type: 'integer' },
  descripcion: { type: 'string' },
  generacion: { type: 'string' },
  generacionFechaInicio: { type: 'string', format: 'date' },
  generacionFechaFin: { type: 'string', format: 'date' },
};

module.exports = { grupo };
