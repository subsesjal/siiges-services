// Solicitud
const solicitud = {
  tipoSolicitudId: { type: 'integer' },
  usuarioId: { type: 'integer' },
  estatusSolicitudId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  cita: { type: 'string', format: 'date-time' },
  fechaRecepcion: { type: 'string', format: 'date-time' },
  folio: { type: 'string' },
};

module.exports = { solicitud };
