const presupuestoEgresos = {
  institucionId: { type: 'integer' },
  periodoId: { type: 'integer' },
  sesionId: { type: 'integer' },
  observacion: { type: 'string' },
  fecha: { type: 'string', format: 'date-time' },
  cantidadEstatal: { type: 'integer' },
  cantidadFederal: { type: 'integer' },
  total: { type: 'integer' },
};

module.exports = {
  presupuestoEgresos,
};
