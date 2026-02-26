// Solicitud Folio
const solicitudFolio = {
  tipoDocumentoId: { type: 'integer' },
  tipoSolicitudFolioId: { type: 'integer' },
  estatusSolicitudFolioId: { type: 'integer' },
  programaId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  folioPago: { type: 'string' },
  claveInstitucionDGP: { type: 'string' },
  claveCarreraDGP: { type: 'string' },
  observaciones: { type: 'string' },
};

module.exports = { solicitudFolio };
