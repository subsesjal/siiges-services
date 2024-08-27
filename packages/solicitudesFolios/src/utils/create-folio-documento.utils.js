const DOCUMENTOS_MAP = {
  Certificado: 'C',
  Título: 'T',
};

const SOLICITUDES_MAP = {
  Total: 'T',
  Parcial: 'P',
  Duplicado: 'D',
};

const createFolioDocumento = async ({
  nivel,
  tipoDocumento,
  tipoSolicitudFolio,
  libro,
  año,
  countFolios,
}) => {
  const totalFoliosLibro = await countFolios(null, {
    isDeleting: true,
    searchColumn: 'libroId',
    searchText: libro.id,
  });

  const nuevoConsecutivo = totalFoliosLibro + 1;
  const consecutivoFormateado = String(nuevoConsecutivo).padStart(6, '0');

  const letraTipoDocumento = DOCUMENTOS_MAP[tipoDocumento];
  const letraTipoSolicitud = SOLICITUDES_MAP[tipoSolicitudFolio];

  const folio = `${nivel}${letraTipoDocumento}${letraTipoSolicitud}${libro.nombre}${año}${consecutivoFormateado}`;

  return folio;
};

module.exports = {
  createFolioDocumento,
};
