// Inspecciones
const inspeccion = {
  programaId: { type: 'integer' },
  estatusInspeccionId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  fechaAsignada: { type: 'string', format: 'date-time' },
  resultado: { type: 'string' },
  folio: { type: 'string' },
};

module.exports = { inspeccion };
