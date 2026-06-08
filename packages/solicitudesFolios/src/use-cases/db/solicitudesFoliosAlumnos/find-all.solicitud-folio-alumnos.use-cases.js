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

const findAllSolicitudFolioAlumnos = (
  findAllSolicitudFolioAlumnosQuery,
  findAllDocumentosFirmadosQuery,
) => async (query) => {
  const include = [
    {
      association: 'alumno',
      include: [
        { association: 'persona' },
        {
          association: 'alumnoGrupos',
          include: [{ association: 'grupo' }],
        },
      ],
    },
    {
      association: 'folioDocumentoAlumno',
      include: [
        { association: 'foja' },
        { association: 'libro' },
      ],
    },
  ];

  const solicitudesFoliosAlumnos = await findAllSolicitudFolioAlumnosQuery(
    query,
    { include, strict: false },
  );

  const foliosInternos = solicitudesFoliosAlumnos
    .map((sfa) => sfa.folioDocumentoAlumno?.folioDocumento)
    .filter(Boolean);

  if (foliosInternos.length === 0) {
    return solicitudesFoliosAlumnos.map((sfa) => {
      const sfaData = sfa.toJSON ? sfa.toJSON() : sfa;
      const grupos = sfaData.alumno?.alumnoGrupos?.map((ag) => ag.grupo).filter(Boolean) || [];

      const fechaTerminacionRaw = grupos
        .map((g) => g.generacionFechaFin)
        .filter(Boolean)
        .sort((a, b) => new Date(b) - new Date(a))[0] || null;

      const fechaInicioRaw = grupos
        .map((g) => g.generacionFechaInicio)
        .filter(Boolean)
        .sort((a, b) => new Date(a) - new Date(b))[0] || null;

      const fechaTerminacion = formatDateDMY(fechaTerminacionRaw);
      const fechaInicio = formatDateDMY(fechaInicioRaw);

      return {
        ...sfaData,
        estadoFirma: { firmaIes: false, firmaSicyt: false, fechaExpedicion: null },
        fechaTerminacion,
        fechaInicio,
      };
    });
  }

  const documentosFirmados = await findAllDocumentosFirmadosQuery(
    { folioInterno: { [Op.in]: foliosInternos } },
    { strict: false },
  );

  const firmasMap = {};
  documentosFirmados.forEach((doc) => {
    const docData = doc.toJSON ? doc.toJSON() : doc;
    firmasMap[docData.folioInterno] = {
      firmaIes: !!docData.firmaDigitalIes,
      firmaSicyt: !!docData.firmaDigitalSicyt,
      fechaExpedicion: docData.fechaExpedicion || null,
    };
  });

  const resultado = solicitudesFoliosAlumnos.map((sfa) => {
    const sfaData = sfa.toJSON ? sfa.toJSON() : sfa;
    const folioInterno = sfaData.folioDocumentoAlumno?.folioDocumento;
    const estadoFirma = firmasMap[folioInterno] || {
      firmaIes: false,
      firmaSicyt: false,
      fechaExpedicion: null,
    };

    const grupos = sfaData.alumno?.alumnoGrupos?.map((ag) => ag.grupo).filter(Boolean) || [];

    const fechaTerminacionRaw = grupos
      .map((g) => g.generacionFechaFin)
      .filter(Boolean)
      .sort((a, b) => new Date(b) - new Date(a))[0] || null;

    const fechaInicioRaw = grupos
      .map((g) => g.generacionFechaInicio)
      .filter(Boolean)
      .sort((a, b) => new Date(a) - new Date(b))[0] || null;

    const fechaTerminacion = formatDateDMY(fechaTerminacionRaw);
    const fechaInicio = formatDateDMY(fechaInicioRaw);

    return {
      ...sfaData,
      estadoFirma,
      fechaTerminacion,
      fechaInicio,
    };
  });

  return resultado;
};

module.exports = findAllSolicitudFolioAlumnos;
