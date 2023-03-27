const { Logger } = require('@siiges-services/shared');

const updateAsignatura = (updateAsignaturaQuery) => async (identifierObj, changes) => {
  Logger.info('[asignatura/update]: Updating asignatura');
  const asignatura = await updateAsignaturaQuery(identifierObj, changes);
  Logger.info('[asignatura/update]: asignaturaupdated');

  return asignatura;
};

module.exports = updateAsignatura;
