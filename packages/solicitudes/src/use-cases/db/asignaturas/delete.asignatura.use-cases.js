const { Logger } = require('@siiges-services/shared');
const { checkers } = require('@siiges-services/shared');

const deleteAsignatura = (findOneAsignaturaQuery, deleteAsignaturaQuery) => async (
  identifierObj,
) => {
  const asignatura2 = await findOneAsignaturaQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(asignatura2, 'asignaturas', identifierObj.id);

  Logger.info('[asignatura/delete]: Deleting asignatura');
  const asignatura = await deleteAsignaturaQuery(identifierObj);
  Logger.info('[asignatura/delete]: Asignatura deleted');

  return asignatura;
};

module.exports = deleteAsignatura;
