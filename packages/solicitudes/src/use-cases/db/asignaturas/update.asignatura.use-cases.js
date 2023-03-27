const { checkers } = require('@siiges-services/shared');

const updateAsignatura = (
  findOneAsignaturaQuery,
  updateAsignaturaQuery,
) => async (identifierObj, changes) => {
  const { asignaturaId } = identifierObj;
  const asignatura = await findOneAsignaturaQuery({ id: asignaturaId });
  checkers.throwErrorIfDataIsFalsy(asignatura, 'asignaturas', asignaturaId);

  const asignaturaUpdated = await updateAsignaturaQuery({ id: asignaturaId }, changes);

  return asignaturaUpdated;
};

module.exports = updateAsignatura;
