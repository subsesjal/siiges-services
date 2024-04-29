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
) => async (identifierObj, changes) => {
  const { id: docenteId } = identifierObj;

  const include = [
    { association: 'persona' },
    {
      association: 'formacionesDocentes',
      include: [
        { association: 'formacion' },
      ],
    },
    {
      association: 'asignaturasDocentes',
      include: [
        { association: 'asignatura' },
      ],
    },
  ];

  let docente = await findOneDocenteQuery(identifierObj, {
    include,
    strict: false,
  });
  checkers.throwErrorIfDataIsFalsy(docente, 'docentes', docenteId);

  let personaUpdated;
  const docenteUpdated = await updateDocenteQuery(identifierObj, changes);

  if (changes.persona) {
    const { persona } = changes;
    personaUpdated = await updatePersonaQuery({ id: docente.personaId }, persona);
    docenteUpdated.dataValues.persona = personaUpdated.dataValues;
  }

  const newAsignaturasDocentesArray = [];
  if (changes.asignaturasDocentes && changes.asignaturasDocentes.length > 0) {
    const asignaturasDocentes = await findAsignaturasDocentesQuery({
      docenteId,
    });

    // Find and create relation asignatura - docente
    await Promise.all(changes.asignaturasDocentes.map(async (asignatura) => {
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
      if (changes.asignaturasDocentes.every((a) => a !== asignaturaId)) {
        const deleteAsignaturaDocente = await findOneAsignaturaDocenteQuery({
          asignaturaId,
          docenteId,
        });
        if (deleteAsignaturaDocente) {
          await deleteAsignaturaDocenteQuery({ id: deleteAsignaturaDocente.id });
        }
      }
    }));
  }
  docenteUpdated.dataValues.asignaturasDocentes = newAsignaturasDocentesArray;

  const newFormacionesDocentesArray = [];
  if (changes.formacionesDocentes && changes.formacionesDocentes.length) {
    await Promise.all(changes.formacionesDocentes.map(async (formacionDocente) => {
      const updateFormacionDocente = await createOrUpdate(
        updateFormacionesDocenteQuery,
        createFormacionesDocenteQuery,
        docenteId,
        formacionDocente,
      );
      newFormacionesDocentesArray.push(updateFormacionDocente);
    }));
  }

  docenteUpdated.dataValues.formacionesDocentes = newFormacionesDocentesArray;

  docente = await findOneDocenteQuery(identifierObj, {
    include,
    strict: false,
  });

  return docente;
};

module.exports = updatedocente;
