const solicitudRevEquiv = {
  interesadoId: { type: 'integer' },
  tipoTramiteId: { type: 'integer' },
  estatusSolicitudRevEquivId: { type: 'integer' },
  fecha: { type: 'string', format: 'date' },
  folioSolicitud: { type: 'string' },
  observaciones: { type: 'string' },
};

module.exports = { solicitudRevEquiv };
