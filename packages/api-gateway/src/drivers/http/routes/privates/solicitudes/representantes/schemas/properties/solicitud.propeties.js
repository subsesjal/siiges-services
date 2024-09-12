const solicitud = {
  tipoSolicitudId: { type: 'integer' },
  usuarioId: { type: 'integer' },
  estatusSolicitudId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  cita: { type: 'string', format: 'date-time' },
  fechaRecepcion: { type: 'string', format: 'date-time' },
  folio: { type: 'string' },
};

const solicitudResponse = {
  ...solicitud,
  id: { type: 'integer' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
  deletedAt: { type: 'string', format: 'date-time' },
};

module.exports = {
  solicitud,
  solicitudResponse,
};
