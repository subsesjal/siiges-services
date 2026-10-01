const { checkers } = require('@siiges-services/shared');
const { Op } = require('sequelize');

const ESTATUS_EN_PROCESO = [1, 2, 4];
const SITUACION_EGRESADO = 3;

const findAllSolicitudFolioAlumnosFirmar = (
  findOneProgramaQuery,
  findOneAlumnoQuery,
  findAllAlumnosQuery,
  findAllSolicitudFolioAlumnosQuery,
  findAllFolioDocumentoAlumnosQuery,
  findAllDocumentosFirmadosQuery,
) => async (identifierObj) => {
  const {
    programaId,
    matricula,
    situacionIds = [],
    tipoDocumentoId,
    parcial = false,
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
  if (situacionIds.length) {
    whereClause.situacionId = situacionIds;
  }

  const alumnos = await findAllAlumnosQuery(whereClause, {
    include,
    strict: false,
  });

  const esEgresados = situacionIds.length === 1 && situacionIds[0] === SITUACION_EGRESADO;

  if (!tipoDocumentoId || !(esEgresados || parcial)) {
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

  // En parcial un alumno puede tener varios certificados,
  // por lo que no se excluye a quien ya tiene folio del mismo tipo.
  let idsConFolio = [];
  if (!parcial) {
    const alumnosConFolio = await findAllFolioDocumentoAlumnosQuery(
      {
        alumnoId: { [Op.in]: alumnosIds },
        tipoDocumentoId,
      },
      { attributes: ['alumnoId'], strict: false },
    );
    idsConFolio = alumnosConFolio.map((f) => f.alumnoId);
  }

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
