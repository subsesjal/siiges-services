const { Op } = require('sequelize');

const findAllSolicitudFolioAlumnos = (
  findAllSolicitudFolioAlumnosQuery,
  findAllDocumentosFirmadosQuery,
) => async (query) => {
  const include = [
    {
      association: 'alumno',
      include: [{ association: 'persona' }],
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
    return solicitudesFoliosAlumnos.map((sfa) => ({
      ...sfa.toJSON(),
      estadoFirma: { firmaIes: false, firmaSicyt: false, fechaExpedicion: null },
    }));
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

    return {
      ...sfaData,
      estadoFirma,
    };
  });

  return resultado;
};

module.exports = findAllSolicitudFolioAlumnos;
