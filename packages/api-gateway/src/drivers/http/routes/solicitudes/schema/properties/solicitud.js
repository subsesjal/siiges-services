// Solicitud
const solicitud = {
  tipoSolicitudId: { type: 'integer' },
  usuarioId: { type: 'integer' },
  estatusSolicitudId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  cita: { type: 'string', format: 'date-time' },
  convocatoria: { type: 'string' },
  fechaRecepcion: { type: 'string', format: 'date-time' },
};

module.exports = { solicitud };
