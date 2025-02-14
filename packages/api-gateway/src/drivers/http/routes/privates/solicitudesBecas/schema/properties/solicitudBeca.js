// Solicitud Beca
const solicitudBeca = {
  estatusSolicitudBecaId: { type: 'integer' },
  cicloEscolarId: { type: 'integer' },
  programaId: { type: 'integer' },
  usuarioId: { type: 'integer' },
  folioSolicitud: { type: 'string' },
  observaciones: { type: 'string' },
};

module.exports = { solicitudBeca };
