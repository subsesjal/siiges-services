const { checkers } = require('@siiges-services/shared');

const deleteAsignatura = (
  findOneAsignaturaQuery,
  findAsignaturasDocentesQuery,
  deleteAsignaturaDocenteQuery,
  deleteAsignaturaQuery,
) => async (identifierObj) => {
  const { id } = identifierObj;

  const asignatura = await findOneAsignaturaQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(asignatura, 'asignaturas', identifierObj.id);

  const asignaturasDocente = await findAsignaturasDocentesQuery({ asignaturaId: id });

  await Promise.all(
    asignaturasDocente.map(async (asignaturaDocente) => {
      const asignaturaDocenteId = asignaturaDocente.dataValues.id;
      await deleteAsignaturaDocenteQuery({ id: asignaturaDocenteId });
    }),
  );

  const asignaturaDeleted = await deleteAsignaturaQuery(identifierObj);

  return asignaturaDeleted;
};

module.exports = deleteAsignatura;
