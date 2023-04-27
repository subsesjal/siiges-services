// Inspecciones
const inspecciones = {
  programa_id: { type: 'integer' },
  estatus_inspeccion_id: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  fecha_asignada: { type: 'string', format: 'date-time' },
  resultado: { type: 'string' },
  folio: { type: 'string' },
};

module.exports = { inspecciones };
