const { checkers } = require('@siiges-services/shared');

const deleteDocente = (
  findOneDocenteQuery,
  findAsignaturasDocentesQuery,
  deleteAsignaturaDocenteQuery,
  deleteDocenteQuery,
) => async (identifierObj) => {
  const { id } = identifierObj;

  const docenteFound = await findOneDocenteQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(docenteFound, 'docentes', identifierObj.id);

  const asignaturasDocente = await findAsignaturasDocentesQuery({ docenteId: id });

  await Promise.all(
    asignaturasDocente.map(async (asignaturaDocente) => {
      const asignaturaDocenteId = asignaturaDocente.dataValues.id;
      await deleteAsignaturaDocenteQuery({ id: asignaturaDocenteId });
    }),
  );

  const docenteDeleted = await deleteDocenteQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(docenteDeleted, 'docentes', identifierObj.id);

  return docenteDeleted;
};

module.exports = deleteDocente;
