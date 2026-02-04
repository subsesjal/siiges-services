const solicitudRevEquiv = {
  interesadoId: { type: 'integer' },
  tipoTramiteId: { type: 'integer' },
  estatusSolicitudRevEquivId: { type: 'integer' },
  fecha: { type: 'string' }, // Cambio de date format
  folioSolicitud: { type: 'string' },
  observaciones: { type: 'string' },
};

module.exports = { solicitudRevEquiv };
