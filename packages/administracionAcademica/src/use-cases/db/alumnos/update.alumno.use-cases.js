const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');

const EGRESADO_SITUACION_ID = 3;
const ASIGNATURA_TIPO_REGULAR = 1;
const SITUACION_VALIDACION_AUTENTICO = 1;

const validateEgresoRequirements = async (
  alumno,
  findOneProgramaQuery,
  findAllAsignaturasQuery,
  findAllCalificacionesQuery,
) => {
  if (!alumno.validacion || alumno.validacion.situacionValidacionId
    !== SITUACION_VALIDACION_AUTENTICO) {
    throw boom.badRequest(
      'Este alumno no se puede validar como Egresado: Su validación no está en estatus Auténtico.',
    );
  }

  const programa = await findOneProgramaQuery({ id: alumno.programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', alumno.programaId);

  const asignaturasRegulares = await findAllAsignaturasQuery({
    programaId: programa.id,
    tipo: ASIGNATURA_TIPO_REGULAR,
  });

  const calificaciones = await findAllCalificacionesQuery(
    { alumnoId: alumno.id },
    { include: ['asignatura'] },
  );

  const aprobatoria = parseFloat(programa.calificacionAprobatoria);

  const aprobadasPorAsignatura = new Map();
  calificaciones.forEach((c) => {
    const nota = parseFloat(c.calificacion);
    if (!Number.isNaN(nota) && nota >= aprobatoria) {
      const previa = aprobadasPorAsignatura.get(c.asignaturaId);
      if (!previa || nota > previa.nota) {
        aprobadasPorAsignatura.set(c.asignaturaId, { nota, asignatura: c.asignatura });
      }
    }
  });

  const tieneMateriasFaltantes = asignaturasRegulares.some(
    (a) => !aprobadasPorAsignatura.has(a.id),
  );

  if (tieneMateriasFaltantes) {
    throw boom.badRequest(
      'Este alumno no se puede validar como Egresado: Le faltan asignaturas obligatorias por aprobar.',
    );
  }

  const creditosRequeridos = parseFloat(programa.creditos);
  let creditosCursados = 0;
  aprobadasPorAsignatura.forEach(({ asignatura }) => {
    creditosCursados += parseFloat(asignatura.creditos);
  });

  if (creditosCursados !== creditosRequeridos) {
    throw boom.badRequest(
      `Este alumno no se puede validar como Egresado: Los créditos cursados (${creditosCursados}) no coinciden con los créditos requeridos por el RVOE (${creditosRequeridos}).`,
    );
  }
};

const updateAlumno = (
  findOneAlumnoQuery,
  findOneAlumnoTipoTramiteQuery,
  createAlumnoTipoTramiteQuery,
  updateAlumnoQuery,
  updateAlumnoTipoTramiteQuery,
  updatePersonaQuery,
  findOneProgramaQuery,
  findAllAsignaturasQuery,
  findAllCalificacionesQuery,
) => async (identifierObj, changes) => {
  const { id } = identifierObj;
  const requiereValidacionEgreso = changes.situacionId === EGRESADO_SITUACION_ID;

  const alumno = await findOneAlumnoQuery(
    identifierObj,
    requiereValidacionEgreso ? { include: ['validacion'] } : undefined,
  );
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', id);

  if (requiereValidacionEgreso && alumno.situacionId !== EGRESADO_SITUACION_ID) {
    await validateEgresoRequirements(
      alumno,
      findOneProgramaQuery,
      findAllAsignaturasQuery,
      findAllCalificacionesQuery,
    );
  }

  let personaUpdated;
  const alumnoUpdated = await updateAlumnoQuery(identifierObj, changes);

  if (changes.persona) {
    const { persona } = changes;
    personaUpdated = await updatePersonaQuery({ id: alumno.personaId }, persona);
    alumnoUpdated.dataValues.persona = personaUpdated.dataValues;
  }

  if (changes.alumnoTipoTramite) {
    const existingAlumnoTipoTramite = await findOneAlumnoTipoTramiteQuery({ alumnoId: alumno.id });

    if (existingAlumnoTipoTramite) {
      // Update the existing alumnoTipoTramite record
      const updatedAlumnoTipoTramite = await updateAlumnoTipoTramiteQuery(
        existingAlumnoTipoTramite.id,
        { tipoTramiteId: changes.alumnoTipoTramite },
      );
      alumnoUpdated.dataValues.alumnoTipoTramite = updatedAlumnoTipoTramite.dataValues;
    } else {
      // Create a new alumnoTipoTramite record
      const newAlumnoTipoTramite = await createAlumnoTipoTramiteQuery({
        alumnoId: alumno.id,
        tipoTramiteId: changes.alumnoTipoTramite,
      });
      alumnoUpdated.dataValues.alumnoTipoTramite = newAlumnoTipoTramite.dataValues;
    }
  }

  return alumnoUpdated;
};

module.exports = updateAlumno;
