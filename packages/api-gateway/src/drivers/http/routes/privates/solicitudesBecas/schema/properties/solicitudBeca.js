// Solicitud Beca
const solicitudBeca = {
  estatusSolicitudBecaId: { type: 'integer' },
  programaId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  folioSolicitud: { type: 'string' },
  observaciones: { type: 'string' },
};

module.exports = { solicitudBeca };
