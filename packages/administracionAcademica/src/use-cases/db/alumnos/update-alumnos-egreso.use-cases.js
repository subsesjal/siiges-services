const {
  TIPOS_DOCUMENTO_REQUERIDOS,
  buildDocumentosPorAlumno,
  tieneDocumentosCompletos,
} = require('./documentos-requeridos.helpers');

const EGRESADO_SITUACION_ID = 3;
const ASIGNATURA_TIPO_REGULAR = 1;
const SITUACION_VALIDACION_AUTENTICO = 1;

const checkAlumnoEgreso = (alumno, programaCache, calificacionesPorAlumno) => {
  if (!alumno.validacion || alumno.validacion.situacionValidacionId
    !== SITUACION_VALIDACION_AUTENTICO) {
    return false;
  }

  const { asignaturasRegulares, calificacionAprobatoria, creditosRequeridos } = programaCache;
  const calificaciones = calificacionesPorAlumno.get(alumno.id) || [];

  const aprobadasPorAsignatura = new Map();
  calificaciones.forEach((c) => {
    const nota = parseFloat(c.calificacion);
    if (!Number.isNaN(nota) && nota >= calificacionAprobatoria) {
      const previa = aprobadasPorAsignatura.get(c.asignaturaId);
      if (!previa || nota > previa.nota) {
        aprobadasPorAsignatura.set(c.asignaturaId, { nota, asignatura: c.asignatura });
      }
    }
  });

  const tieneMateriasFaltantes = asignaturasRegulares.some(
    (a) => !aprobadasPorAsignatura.has(a.id),
  );
  if (tieneMateriasFaltantes) return false;

  let creditosCursados = 0;
  aprobadasPorAsignatura.forEach(({ asignatura }) => {
    creditosCursados += parseFloat(asignatura.creditos);
  });

  return creditosCursados >= creditosRequeridos;
};

const buildProgramaCaches = async (
  programaIds,
  findOneProgramaQuery,
  findAllAsignaturasQuery,
) => {
  const programaCaches = new Map();

  await Promise.all(programaIds.map(async (programaId) => {
    const programa = await findOneProgramaQuery({ id: programaId });
    if (!programa) {
      programaCaches.set(programaId, null);
      return;
    }

    const asignaturasRegulares = await findAllAsignaturasQuery({
      programaId,
      tipo: ASIGNATURA_TIPO_REGULAR,
    });

    programaCaches.set(programaId, {
      asignaturasRegulares,
      calificacionAprobatoria: parseFloat(programa.calificacionAprobatoria),
      creditosRequeridos: parseFloat(programa.creditos),
    });
  }));

  return programaCaches;
};

const buildCalificacionesPorAlumno = async (alumnoIds, findAllCalificacionesQuery) => {
  const calificaciones = await findAllCalificacionesQuery(
    { alumnoId: alumnoIds },
    { include: ['asignatura'] },
  );

  const calificacionesPorAlumno = new Map();
  calificaciones.forEach((c) => {
    if (!calificacionesPorAlumno.has(c.alumnoId)) {
      calificacionesPorAlumno.set(c.alumnoId, []);
    }
    calificacionesPorAlumno.get(c.alumnoId).push(c);
  });

  return calificacionesPorAlumno;
};

const updateAlumnosEgreso = (
  findAllAlumnosQuery,
  findOneProgramaQuery,
  findAllAsignaturasQuery,
  findAllCalificacionesQuery,
  findAllFilesQuery,
  updateAlumnoQuery,
) => async ({ alumnoIds }) => {
  const alumnosEncontrados = await findAllAlumnosQuery(
    { id: alumnoIds },
    {
      attributes: ['id', 'situacionId', 'programaId'],
      include: [
        { association: 'validacion', attributes: ['situacionValidacionId'] },
      ],
    },
  );

  const idsEncontrados = alumnosEncontrados.map((alumno) => alumno.id);
  const idsNoEncontrados = alumnoIds.filter((id) => !idsEncontrados.includes(id));

  const egresables = [];
  const noEgresables = [...idsNoEncontrados];

  const yaEgresados = alumnosEncontrados.filter(
    (alumno) => alumno.situacionId === EGRESADO_SITUACION_ID,
  );
  yaEgresados.forEach((alumno) => egresables.push(alumno.id));

  const porValidar = alumnosEncontrados.filter(
    (alumno) => alumno.situacionId !== EGRESADO_SITUACION_ID,
  );

  if (porValidar.length > 0) {
    const programaIds = [...new Set(porValidar.map((alumno) => alumno.programaId))];
    const porValidarIds = porValidar.map((alumno) => alumno.id);

    const [programaCaches, calificacionesPorAlumno, archivos] = await Promise.all([
      buildProgramaCaches(programaIds, findOneProgramaQuery, findAllAsignaturasQuery),
      buildCalificacionesPorAlumno(porValidarIds, findAllCalificacionesQuery),
      findAllFilesQuery(
        { entidadId: porValidarIds, tipoDocumentoId: TIPOS_DOCUMENTO_REQUERIDOS },
        { attributes: ['entidadId', 'tipoDocumentoId'] },
      ),
    ]);

    const documentosPorAlumno = buildDocumentosPorAlumno(archivos);

    porValidar.forEach((alumno) => {
      const programaCache = programaCaches.get(alumno.programaId);
      const documentosOk = tieneDocumentosCompletos(alumno.id, documentosPorAlumno);
      const requisitosAcademicosOk = programaCache
        ? checkAlumnoEgreso(alumno, programaCache, calificacionesPorAlumno)
        : false;

      if (documentosOk && requisitosAcademicosOk) {
        egresables.push(alumno.id);
      } else {
        noEgresables.push(alumno.id);
      }
    });
  }

  if (egresables.length > 0) {
    await updateAlumnoQuery({ id: egresables }, { situacionId: EGRESADO_SITUACION_ID });
  }

  return {
    egresados: egresables,
    noEgresados: noEgresables,
    totalEgresados: egresables.length,
    totalNoEgresados: noEgresables.length,
  };
};

module.exports = updateAlumnosEgreso;
