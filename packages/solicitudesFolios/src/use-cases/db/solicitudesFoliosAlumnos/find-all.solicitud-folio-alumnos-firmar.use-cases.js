const { checkers } = require('@siiges-services/shared');
const { Op } = require('sequelize');

const ESTATUS_EN_PROCESO = [1, 2, 4];

const findAllSolicitudFolioAlumnosFirmar = (
  findOneProgramaQuery,
  findOneAlumnoQuery,
  findAllAlumnosQuery,
  findAllSolicitudFolioAlumnosQuery,
  findAllFolioDocumentoAlumnosQuery,
  findAllDocumentosFirmadosQuery,
) => async (identifierObj) => {
  const {
    programaId, matricula, situacionId, tipoDocumentoId,
  } = identifierObj;

  const include = [
    { association: 'persona' },
    { association: 'situacion' },
    { association: 'equivalencia' },
    {
      association: 'validacion',
      include: [
        { association: 'situacionValidacion' },
      ],
    },
    {
      association: 'alumnoGrupos',
      include: [{
        association: 'grupo',
        include: [{
          association: 'grado',
        }],
      }],
    },
  ];

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  if (matricula) {
    const alumno = await findOneAlumnoQuery(
      { programaId, matricula },
      { include, strict: false },
    );
    checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', matricula);
    return alumno;
  }

  const whereClause = { programaId };
  if (situacionId) {
    whereClause.situacionId = situacionId;
  }

  const alumnos = await findAllAlumnosQuery(whereClause, {
    include,
    strict: false,
  });

  if (situacionId !== 3 || !tipoDocumentoId) {
    return alumnos;
  }

  const alumnosIds = alumnos.map((a) => a.id);

  if (alumnosIds.length === 0) {
    return [];
  }

  const todasSolicitudes = await findAllSolicitudFolioAlumnosQuery(
    { alumnoId: { [Op.in]: alumnosIds } },
    {
      attributes: ['alumnoId', 'solicitudFolioId'],
      include: [{
        association: 'solicitudFolio',
        attributes: ['id', 'tipoDocumentoId', 'estatusSolicitudFolioId'],
        required: true,
      }],
      strict: false,
    },
  );

  const idsEnSolicitudEnProceso = todasSolicitudes
    .filter((s) => s.solicitudFolio?.tipoDocumentoId === tipoDocumentoId
      && ESTATUS_EN_PROCESO.includes(s.solicitudFolio?.estatusSolicitudFolioId))
    .map((s) => s.alumnoId);

  const alumnosConFolio = await findAllFolioDocumentoAlumnosQuery(
    {
      alumnoId: { [Op.in]: alumnosIds },
      tipoDocumentoId,
    },
    { attributes: ['alumnoId'], strict: false },
  );
  const idsConFolio = alumnosConFolio.map((f) => f.alumnoId);

  let alumnosFiltrados = alumnos.filter(
    (alumno) => !idsEnSolicitudEnProceso.includes(alumno.id)
      && !idsConFolio.includes(alumno.id),
  );

  if (tipoDocumentoId === 1 && alumnosFiltrados.length > 0) {
    const alumnosFiltradosIds = alumnosFiltrados.map((a) => a.id);

    const foliosCertificado = await findAllFolioDocumentoAlumnosQuery(
      {
        alumnoId: { [Op.in]: alumnosFiltradosIds },
        tipoDocumentoId: 2,
      },
      {
        attributes: ['alumnoId', 'folioDocumento'],
        strict: false,
      },
    );

    if (foliosCertificado.length === 0) {
      return [];
    }

    const foliosDocumento = foliosCertificado.map((f) => f.folioDocumento);

    const documentosFirmados = await findAllDocumentosFirmadosQuery(
      {
        folioInterno: { [Op.in]: foliosDocumento },
        fechaExpedicion: { [Op.ne]: null },
      },
      { attributes: ['folioInterno'], strict: false },
    );

    const foliosConCertificadoFirmado = documentosFirmados.map((d) => d.folioInterno);

    const alumnosConCertificadoFirmado = foliosCertificado
      .filter((f) => foliosConCertificadoFirmado.includes(f.folioDocumento))
      .map((f) => f.alumnoId);

    alumnosFiltrados = alumnosFiltrados.filter(
      (alumno) => alumnosConCertificadoFirmado.includes(alumno.id),
    );
  }

  return alumnosFiltrados;
};

module.exports = findAllSolicitudFolioAlumnosFirmar;
