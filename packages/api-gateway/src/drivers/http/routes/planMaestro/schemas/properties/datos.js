const datos = {
  planesMaestroId: { type: 'integer' },
  tipoDeProyectoId: { type: 'integer' },
  contratoYCalendarioId: { type: 'integer' },
  montoAutorizado: { type: 'integer' },
  montoContratado: { type: 'integer' },
  nombre: { type: 'string' },
  montoNoContratado: { type: 'integer' },
  montoEjercido: { type: 'integer' },
  remanente: { type: 'integer' },
  acciones: { type: 'string' },
  porcentajeDeAvance: { type: 'integer' },
  fechaRealInicio: { type: 'string', format: 'date-time' },
  fechaRealFin: { type: 'string', format: 'date-time' },
  obeservaciones: { type: 'string' },
};

module.exports = { datos };
