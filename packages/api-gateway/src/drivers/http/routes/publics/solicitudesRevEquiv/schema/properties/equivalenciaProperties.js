const equivalenciaProperties = {
  tipoTramiteId: { type: 'string' },
  estatusSolicitud: { type: 'string' },
  fecha: { type: 'string', format: 'date-time' },
  observaciones: { type: 'string' },
  alumnoId: { type: 'string', nullable: true },
};

module.exports = equivalenciaProperties;
