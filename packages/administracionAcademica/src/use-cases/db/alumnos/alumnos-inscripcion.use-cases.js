const { checkers } = require('@siiges-services/shared');

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
  const include = [{ association: 'cicloEscolar' }];

  let grupo = await findOneGrupoQuery({ id: grupoId }, {
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(grupo, 'grupos', grupoId);

  grupo = grupo.toJSON();

  const { programaId } = grupo.cicloEscolar;

  const programa = await findOneProgramaQuery({ id: programaId });
  checkers.throwErrorIfDataIsFalsy(programa, 'programas', programaId);

  const validateAlumnosPromises = dataArray.map(async (obj) => {
    const { alumnoId } = obj;
    const alumno = await findOneAlumnoQuery({ id: alumnoId });
    checkers.throwErrorIfDataIsFalsy(alumno, 'alumnos', alumnoId);
  });

  await Promise.all(validateAlumnosPromises);

  const alumnosInscripcionArray = [];

  const saveAlumnosGrupoPromises = dataArray.map(async (obj) => {
    const { alumnoId, asignaturas } = obj;

    const alumnoGrupo = await findOneAlumnoGrupoQuery({ alumnoId, grupoId });

    if (!alumnoGrupo) {
      await createAlumnoGrupoQuery({ alumnoId, grupoId });
    }

    const asignaturasAlumno = await findAllCalificacionesQuery({ alumnoId, grupoId });

    // Find and create relation asignatura - alumno
    await Promise.all(asignaturas.map(async (asignatura) => {
      if (asignaturasAlumno.some(({ asignaturaId }) => asignaturaId === asignatura)) {
        const asignaturaAlumno = await findOneCalificacionQuery({
          asignaturaId: asignatura,
          grupoId,
          alumnoId,
        });
        alumnosInscripcionArray.push(asignaturaAlumno);
      } else {
        const asignaturaFound = await findOneAsignaturaQuery({
          id: asignatura,
          programaId,
        });

        if (asignaturaFound) {
          let newAsignaturaAlumno = await createCalificacionQuery({
            alumnoId,
            asignaturaId: asignatura,
            grupoId,
            tipo: 1,
          });
          newAsignaturaAlumno = newAsignaturaAlumno.toJSON();
          alumnosInscripcionArray.push(newAsignaturaAlumno);
        }
      }
    }));

    // Delete relation asignatura - alumno
    await Promise.all(asignaturasAlumno.map(async (asignaturaAlumno) => {
      if (!asignaturas.includes(asignaturaAlumno.asignaturaId)) {
        await deleteCalificacionQuery({ id: asignaturaAlumno.id });
      }
    }));
  });

  await Promise.all(saveAlumnosGrupoPromises);

  return dataArray;
};

module.exports = alumnosInscripcion;
