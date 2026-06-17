const { Op } = require('sequelize');

const formatDateDMY = (value) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

const findAllCertificados = (
  findAllSolicitudFolioAlumnosQuery,
  findAllDocumentosFirmadosQuery,
) => async (query) => {
  const { numeroRvoe } = query;

  const include = [
    {
      association: 'alumno',
      required: true,
      include: [
        { association: 'persona' },
        {
          association: 'alumnoGrupos',
          include: [{ association: 'grupo' }],
        },
        {
          association: 'programa',
          where: numeroRvoe ? { acuerdoRvoe: numeroRvoe } : undefined,
          required: !!numeroRvoe,
        },
      ],
    },
    {
      association: 'folioDocumentoAlumno',
      required: true,
      include: [
        { association: 'foja' },
        { association: 'libro' },
      ],
    },
  ];

  const solicitudesFoliosAlumnos = await findAllSolicitudFolioAlumnosQuery(
    {},
    { include, strict: false, subQuery: false },
  );

  const solicitudesFiltradas = numeroRvoe
    ? solicitudesFoliosAlumnos.filter(
      (sfa) => sfa.alumno?.programa?.acuerdoRvoe === numeroRvoe,
    )
    : solicitudesFoliosAlumnos;

  const foliosInternos = solicitudesFiltradas
    .map((sfa) => sfa.folioDocumentoAlumno?.folioDocumento)
    .filter(Boolean);

  if (foliosInternos.length === 0) {
    return [];
  }

  const documentosFirmados = await findAllDocumentosFirmadosQuery(
    { folioInterno: { [Op.in]: foliosInternos } },
    { strict: false },
  );

  const firmasMap = {};
  documentosFirmados.forEach((doc) => {
    const docData = doc.toJSON ? doc.toJSON() : doc;
    firmasMap[docData.folioInterno] = docData;
  });

  const resultado = solicitudesFiltradas
    .map((sfa) => {
      const sfaData = sfa.toJSON ? sfa.toJSON() : sfa;
      const folioInterno = sfaData.folioDocumentoAlumno?.folioDocumento;
      const documentoFirmado = firmasMap[folioInterno];

      const firmaIes = !!documentoFirmado?.firmaDigitalIes;
      const firmaSicyt = !!documentoFirmado?.firmaDigitalSicyt;

      if (!firmaIes || !firmaSicyt) {
        return null;
      }

      const grupos = sfaData.alumno?.alumnoGrupos?.map((ag) => ag.grupo).filter(Boolean) || [];

      const fechaTerminacionRaw = grupos
        .map((g) => g.generacionFechaFin)
        .filter(Boolean)
        .sort((a, b) => new Date(b) - new Date(a))[0] || null;

      return {
        id: sfaData.id,
        consecutivo: sfaData.consecutivo,
        nombreCompleto: [
          sfaData.alumno?.persona?.nombre,
          sfaData.alumno?.persona?.apellidoPaterno,
          sfaData.alumno?.persona?.apellidoMaterno,
        ].filter(Boolean).join(' '),
        matricula: sfaData.alumno?.matricula,
        folio: folioInterno,
        foja: sfaData.folioDocumentoAlumno?.foja?.nombre,
        libro: sfaData.folioDocumentoAlumno?.libro?.nombre,
        fechaExpedicion: formatDateDMY(documentoFirmado?.fechaExpedicion),
        fechaTerminacion: formatDateDMY(fechaTerminacionRaw),
        folioDocumentoAlumnoId: sfaData.folioDocumentoAlumno?.id,
      };
    })
    .filter(Boolean);

  return resultado;
};

module.exports = { findAllCertificados };
