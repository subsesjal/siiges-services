const boom = require('@hapi/boom');
const { checkers, Logger } = require('@siiges-services/shared');

const SITAUCION_ALUMNO_ACTIVO = 1;
const SITAUCIONES_VALIDACION = [1, 3];

const validateAlumno = async ({ findOneAlumnoQuery, programaId, alumnoId }) => {
  const alumno = await findOneAlumnoQuery({ id: alumnoId, programaId });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', alumnoId);
  return alumno;
};

const validateActiveAlumno = async ({ findOneAlumnoQuery, programaId, alumnoId }) => {
  const alumno = await findOneAlumnoQuery(
    { id: alumnoId, programaId, situacionId: SITAUCION_ALUMNO_ACTIVO },
  );
  if (!alumno) throw boom.conflict(`[alumnos]: alumno with identifier ${alumnoId} is not active`);
  return alumno;
};

const validateAlumnoValidation = async ({ findOneValidacionQuery, alumnoId }) => {
  const validacion = await findOneValidacionQuery(
    { alumnoId, situacionValidacionId: SITAUCIONES_VALIDACION },
  );
  if (!validacion) throw boom.conflict(`[alumnos]: alumno with identifier ${alumnoId} is not validated`);
};

const validateAlumnos = async ({
  findOneAlumnoQuery, findOneValidacionQuery, dataArray, programaId,
}) => {
  await Promise.all(dataArray.map(async ({ alumnoId }) => {
    await validateAlumno({ findOneAlumnoQuery, programaId, alumnoId });
    await validateActiveAlumno({ findOneAlumnoQuery, programaId, alumnoId });
    await validateAlumnoValidation({ findOneValidacionQuery, alumnoId });
  }));
};

const validatePrograma = async ({ findOneProgramaQuery, programaId }) => {
  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'alumnos', programaId);
};

const validateGrupo = async ({ findOneGrupoQuery, grupoId }) => {
  const grupo = await findOneGrupoQuery({ id: grupoId }, { include: [{ association: 'cicloEscolar' }], strict: false });
  checkers.throwErrorIfDataIsFalsy(grupo, 'grupos', grupoId);
  return grupo.toJSON();
};

const validateAsignatura = async ({ findOneAsignaturaQuery, programaId, asignaturaId }) => {
  const asignatura = await findOneAsignaturaQuery({ id: asignaturaId, programaId });
  checkers.throwErrorIfDataIsFalsy(asignatura, 'asignaturas', asignaturaId);
  return asignatura;
};

const updateOrCreateCalificacion = async ({
  findCalificacion,
  createCalificacion,
  updateCalificacion,
  dataArray,
  grupoId,
  asignaturaId,
  tipo,
}) => {
  const calificacionArray = [];
  const updateOrInsert = async ({
    alumnoId, calificacion, fechaExamen,
  }) => {
    const alumnoCalif = await findCalificacion({
      alumnoId, grupoId, asignaturaId, tipo,
    });
    const updatedCalificacion = alumnoCalif
      ? await updateCalificacion({ id: alumnoCalif.id }, { calificacion, fechaExamen })
      : await createCalificacion({
        alumnoId, grupoId, asignaturaId, calificacion, fechaExamen, tipo,
      });
    if (updatedCalificacion) calificacionArray.push(updatedCalificacion.toJSON());
  };

  await Promise.all(dataArray.map(updateOrInsert));

  return calificacionArray;
};

const updateCalificaciones = (
  findOneGrupoQuery,
  findOneProgramaQuery,
  findOneAlumnoQuery,
  findOneAsignaturaQuery,
  findOneValidacionQuery,
  findOneCalificacionQuery,
  createCalificacionQuery,
  updateCalificacionQuery,
) => async (identifierObject, dataArray) => {
  const { grupoId, asignaturaId, tipo } = identifierObject;

  Logger.info('[alumnos]: add calificaciones');

  const grupo = await validateGrupo({ findOneGrupoQuery, grupoId });
  const { programaId } = grupo.cicloEscolar;

  await validatePrograma({ findOneProgramaQuery, programaId });

  await validateAsignatura({
    findOneAsignaturaQuery, asignaturaId, programaId,
  });

  await validateAlumnos({
    findOneAlumnoQuery, findOneValidacionQuery, programaId, dataArray,
  });

  return updateOrCreateCalificacion({
    findCalificacion: findOneCalificacionQuery,
    createCalificacion: createCalificacionQuery,
    updateCalificacion: updateCalificacionQuery,
    dataArray,
    grupoId,
    asignaturaId,
    tipo,
  });
};

module.exports = updateCalificaciones;
