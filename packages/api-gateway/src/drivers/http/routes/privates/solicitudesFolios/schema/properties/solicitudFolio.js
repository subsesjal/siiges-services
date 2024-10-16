// Solicitud Folio
const solicitudFolio = {
  tipoDocumentoId: { type: 'integer' },
  tipoSolicitudFolioId: { type: 'integer' },
  estatusSolicitudFolioId: { type: 'integer' },
  institucionDgpId: { type: 'integer' },
  programaId: { type: 'integer' },
  fecha: { type: 'string', format: 'date-time' },
  folioPago: { type: 'string' },
  observaciones: { type: 'string' },
};

module.exports = { solicitudFolio };
