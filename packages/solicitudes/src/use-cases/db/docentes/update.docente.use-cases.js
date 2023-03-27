const { checkers } = require('@siiges-services/shared');

const updatedocente = (
  findOneDocenteQuery,
  findAsignaturasDocentesQuery,
  findOneAsignaturaDocenteQuery,
  findOneAsignaturaQuery,
  updateDocenteQuery,
  updatePersonaQuery,
  createAsignaturasDocenteQuery,
  deleteAsignaturaDocenteQuery,
) => async (identifierObj, changes) => {
  const { docenteId } = identifierObj;

  const docente = await findOneDocenteQuery(docenteId);
  checkers.throwErrorIfDataIsFalsy(docente, 'docentes', docenteId);

  let personaUpdated;
  const docenteUpdated = await updateDocenteQuery(identifierObj, changes);

  if (changes.persona) {
    const { persona } = changes;
    personaUpdated = await updatePersonaQuery({ id: docente.personaId }, persona);
    docenteUpdated.dataValues.persona = personaUpdated.dataValues;
  }

  const changesAsignaturasDocentes = changes.asignaturasDocentes;

  if (changesAsignaturasDocentes && changesAsignaturasDocentes.length > 0) {
    const asignaturasDocentes = await findAsignaturasDocentesQuery({
      docenteId: docenteUpdated.id,
    });
    const newAsignaturasDocenteArray = [];

    // Find and create relation asignatura - docente
    await Promise.all(changesAsignaturasDocentes.map(async (asignatura) => {
      if (asignaturasDocentes.some(({ asignaturaId }) => asignaturaId === asignatura)) {
        const asignaturaDocente = await findOneAsignaturaDocenteQuery({
          asignaturaId: asignatura,
          docenteId: docenteUpdated.id,
        });
        newAsignaturasDocenteArray.push(asignaturaDocente);
      } else {
        const asignaturaFound = await findOneAsignaturaQuery({
          id: asignatura,
        });
        if (asignaturaFound) {
          const newAsignaturaDocente = await createAsignaturasDocenteQuery({
            asignaturaId: asignatura,
            docenteId: docenteUpdated.id,
          });
          newAsignaturasDocenteArray.push(newAsignaturaDocente);
        }
      }
    }));

    // Delete relation asignatura - docente
    await Promise.all(asignaturasDocentes.map(async ({ asignaturaId }) => {
      if (changesAsignaturasDocentes.some((a) => a !== asignaturaId)) {
        const deleteAsignaturaDocente = await findOneAsignaturaDocenteQuery({
          asignaturaId,
          docenteId: docenteUpdated.id,
        });
        if (deleteAsignaturaDocente) {
          await deleteAsignaturaDocenteQuery({ id: deleteAsignaturaDocente.id });
        }
      }
    }));

    docenteUpdated.dataValues.asignaturasDocentes = newAsignaturasDocenteArray;
  }

  return docenteUpdated;
};

module.exports = updatedocente;
