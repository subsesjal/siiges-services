const { checkers, Logger } = require('@siiges-services/shared');

const validateAlumno = async ({ findOneAlumnoQuery, alumnoId }) => {
  const alumno = await findOneAlumnoQuery({ id: alumnoId });
  checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', alumnoId);
};

const validatePrograma = async ({ findOneProgramaQuery, programaId }) => {
  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'alumnos', programaId);
};

const validateGrupo = async ({ findOneGrupoQuery, grupoId }) => {
  const include = [{ association: 'cicloEscolar' }];

  const grupo = await findOneGrupoQuery({ id: grupoId }, {
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(grupo, 'grupos', grupoId);

  return grupo;
};

const saveAlumnosGrupo = async ({
  findOneAlumnoGrupoQuery,
  createAlumnoGrupoQuery,
  grupoId,
  dataArray,
}) => {
  dataArray.map(async (obj) => {
    const { alumnoId } = obj;

    const alumnoGrupo = await findOneAlumnoGrupoQuery({ alumnoId, grupoId });

    if (!alumnoGrupo) {
      await createAlumnoGrupoQuery({ alumnoId, grupoId });
    }
  });
};

const createAlumnoAsignaturasRelations = async ({
  findOneCalificacionQuery,
  findOneAsignaturaQuery,
  createCalificacionQuery,
  alumnoAsignaturas,
  asignaturas,
  alumnoId,
  programaId,
  grupoId,
}) => {
  await Promise.all(asignaturas.map(async (asignatura) => {
    if (alumnoAsignaturas.some(({ asignaturaId }) => asignaturaId === asignatura)) {
      await findOneCalificacionQuery({
        asignaturaId: asignatura,
        grupoId,
        alumnoId,
      });
    } else {
      const asignaturaFound = await findOneAsignaturaQuery({
        id: asignatura,
        programaId,
      });

      if (asignaturaFound) {
        await createCalificacionQuery({
          alumnoId,
          asignaturaId: asignatura,
          grupoId,
          tipo: 1,
        });
      }
    }
  }));
};

const deleteAlumnoAsignaturasRelations = async ({
  deleteCalificacionQuery,
  alumnoAsignaturas,
  asignaturas,
}) => {
  const toDelete = alumnoAsignaturas.filter((
    alumnoAsignatura,
  ) => !asignaturas.includes(alumnoAsignatura.asignaturaId));

  await Promise.all(toDelete.map(({ id }) => deleteCalificacionQuery({ id })));
};

const createUpdateAlumnosAsignaturas = async ({
  findOneCalificacionQuery,
  findOneAsignaturaQuery,
  findAllCalificacionesQuery,
  createCalificacionQuery,
  deleteCalificacionQuery,
  dataArray,
  programaId,
  grupoId,
}) => {
  dataArray.map(async (obj) => {
    const { alumnoId, asignaturas } = obj;

    const alumnoAsignaturas = await findAllCalificacionesQuery({
      alumnoId,
      grupoId,
      tipo: 1,
    });

    await Promise.all([
      createAlumnoAsignaturasRelations({
        findOneCalificacionQuery,
        findOneAsignaturaQuery,
        createCalificacionQuery,
        alumnoAsignaturas,
        alumnoId,
        asignaturas,
        programaId,
        grupoId,
      }),
      deleteAlumnoAsignaturasRelations({
        deleteCalificacionQuery,
        alumnoAsignaturas,
        alumnoId,
        asignaturas,
      }),
    ]);
  });
};

const alumnosInscripcion = (
  findOneGrupoQuery,
  findOneProgramaQuery,
  findOneAlumnoQuery,
  findOneAsignaturaQuery,
  findOneCalificacionQuery,
  findAllCalificacionesQuery,
  findOneAlumnoGrupoQuery,
  createAlumnoGrupoQuery,
  createCalificacionQuery,
  deleteCalificacionQuery,
) => async ({ grupoId }, dataArray) => {
  Logger.info('[alumnos]: add alumnos inscritos');

  let grupo = await validateGrupo({ findOneGrupoQuery, grupoId });
  grupo = grupo.toJSON();
  const { programaId } = grupo.cicloEscolar;

  await validatePrograma({ findOneProgramaQuery, programaId });

  await Promise.all(dataArray.map(({ alumnoId }) => validateAlumno({
    findOneAlumnoQuery,
    alumnoId,
  })));

  await saveAlumnosGrupo({
    findOneAlumnoGrupoQuery, createAlumnoGrupoQuery, grupoId, dataArray,
  });

  await createUpdateAlumnosAsignaturas({
    findOneCalificacionQuery,
    findOneAsignaturaQuery,
    findAllCalificacionesQuery,
    createCalificacionQuery,
    deleteCalificacionQuery,
    dataArray,
    programaId,
    grupoId,
  });

  const alumnosAsignaturas = await Promise.all(dataArray.map(async (obj) => {
    const { alumnoId } = obj;

    const alumnoAsignaturas = await findAllCalificacionesQuery({
      alumnoId,
      grupoId,
      tipo: 1,
    });

    return { alumnoId, alumnoAsignaturas };
  }));

  return alumnosAsignaturas;
};

module.exports = alumnosInscripcion;
