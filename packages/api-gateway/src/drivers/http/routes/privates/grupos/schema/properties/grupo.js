const grupo = {
  cicloEscolarId: { type: 'integer' },
  turnoId: { type: 'integer' },
  gradoId: { type: 'integer' },
  descripcion: { type: 'string' },
  generacion: { type: 'string' },
  generacionFechaInicio: { type: 'string' }, // Cambio de date format
  generacionFechaFin: { type: 'string' }, // Cambio de date format
};

module.exports = { grupo };
