const { Logger } = require('@siiges-services/shared');
const { checkers } = require('@siiges-services/shared');

const deleteAsignatura = (findOneAsignaturaQuery, deleteAsignaturaQuery) => async (
  identifierObj,
) => {
  const asignatura = await findOneAsignaturaQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(asignatura, 'asignaturas', identifierObj.id);

  Logger.info('[asignatura/delete]: Deleting asignatura');
  const asignaturaDeleted = await deleteAsignaturaQuery(identifierObj);
  Logger.info('[asignatura/delete]: Asignatura deleted');

  return asignaturaDeleted;
};

module.exports = deleteAsignatura;
