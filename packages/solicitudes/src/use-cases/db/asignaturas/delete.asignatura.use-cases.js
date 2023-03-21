const { Logger } = require('@siiges-services/shared');

const deleteAsignatura = (deleteAsignaturaQuery) => async (
  identifierObj,
) => {
  Logger.info('[asignatura/delete]: Deleting asignatura');
  const asignatura = await deleteAsignaturaQuery(identifierObj);
  Logger.info('[asignatura/delete]: Asignatura deleted');

  return asignatura;
};

module.exports = deleteAsignatura;
