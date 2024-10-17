const equivalenciaProperties = {
  interesadoId: { type: 'integer' },
  tipoTramiteId: { type: 'integer' },
  estatusSolicitudRevEquivId: { type: 'integer' },
  fecha: { type: 'string', format: 'date' },
  folioSolicitud: { type: 'string' },
};
module.exports = equivalenciaProperties;
