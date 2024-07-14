// Solicitud Folio
const solicitudFolio = {
  tipoDocumentoId: { type: 'integer' },
  tipoSolicitudFolioId: { type: 'integer' },
  estatusSolicitudFolioId: { type: 'integer' },
  programaId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  folioSolicitud: { type: 'string' },
  folioPago: { type: 'string' },
};

module.exports = { solicitudFolio };
