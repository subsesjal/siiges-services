const { checkers } = require('@siiges-services/shared');

const createOrUpdate = async (
  updateQuery,
  createQuery,
  docenteId,
  { id, ...dataValues },
) => {
  if (id) {
    const result = await updateQuery({ id }, dataValues);
    return result;
  }
  const includeFormacionDocente = [{
    association: 'formacion',
  }];
  const result = await createQuery({ docenteId, formacion: dataValues }, includeFormacionDocente);
  return result;
};

const updatedocente = (
  findOneDocenteQuery,
  findAsignaturasDocentesQuery,
  findOneAsignaturaDocenteQuery,
  findOneAsignaturaQuery,
  updateDocenteQuery,
  updatePersonaQuery,
  createAsignaturasDocenteQuery,
  deleteAsignaturaDocenteQuery,
  updateFormacionesDocenteQuery,
  createFormacionesDocenteQuery,
) => async (identifierObj, { formacionesDocentes, ...changes }) => {
  const { id: docenteId } = identifierObj;

  const docente = await findOneDocenteQuery(identifierObj);
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
      docenteId,
    });
    const newAsignaturasDocentesArray = [];

    // Find and create relation asignatura - docente
    await Promise.all(changesAsignaturasDocentes.map(async (asignatura) => {
      if (asignaturasDocentes.some(({ asignaturaId }) => asignaturaId === asignatura)) {
        const asignaturaDocente = await findOneAsignaturaDocenteQuery({
          asignaturaId: asignatura,
          docenteId,
        });
        newAsignaturasDocentesArray.push(asignaturaDocente);
      } else {
        const asignaturaFound = await findOneAsignaturaQuery({
          id: asignatura,
        });
        if (asignaturaFound) {
          const newAsignaturaDocente = await createAsignaturasDocenteQuery({
            asignaturaId: asignatura,
            docenteId: docenteUpdated.id,
          });
          newAsignaturasDocentesArray.push(newAsignaturaDocente);
        }
      }
    }));

    // Delete relation asignatura - docente
    await Promise.all(asignaturasDocentes.map(async ({ asignaturaId }) => {
      if (changesAsignaturasDocentes.some((a) => a !== asignaturaId)) {
        const deleteAsignaturaDocente = await findOneAsignaturaDocenteQuery({
          asignaturaId,
          docenteId,
        });
        if (deleteAsignaturaDocente) {
          await deleteAsignaturaDocenteQuery({ id: deleteAsignaturaDocente.id });
        }
      }
    }));

    docenteUpdated.dataValues.asignaturasDocentes = newAsignaturasDocentesArray;
  }

  if (formacionesDocentes.length) {
    const newFormacionesDocentes = [];
    await Promise.all(formacionesDocentes.map(async (formacionDocente) => {
      const updateFormacionDocente = await createOrUpdate(
        updateFormacionesDocenteQuery,
        createFormacionesDocenteQuery,
        docenteId,
        formacionDocente,
      );
      newFormacionesDocentes.push(updateFormacionDocente);
    }));
    docenteUpdated.dataValues.formacionesDocentes = newFormacionesDocentes;
  }

  return docenteUpdated;
};

module.exports = updatedocente;
