const DOCUMENTOS_MAP = {
  Certificado: 'C',
  Título: 'T',
};

const SOLICITUDES_MAP = {
  Total: 'T',
  Parcial: 'P',
  Duplicado: 'D',
};

const NIVELES_MAP = {
  Licenciatura: 'L',
  Bachillerato: 'B',
  TSU: 'T',
  'Técnico Superior Universitario': 'T',
  Especialidad: 'E',
  Maestría: 'M',
  Doctorado: 'D',
  'Profesional Asociado': 'P',
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

  const letraNivel = NIVELES_MAP[nivel] || nivel.charAt(0).toUpperCase();

  const letraTipoDocumento = DOCUMENTOS_MAP[tipoDocumento];

  const letraTipoSolicitud = SOLICITUDES_MAP[tipoSolicitudFolio] || '';

  const folio = `${letraNivel}${letraTipoDocumento}${letraTipoSolicitud}${libro.nombre}${año}-${nuevoConsecutivo}`;

  return folio;
};

module.exports = {
  createFolioDocumento,
};
