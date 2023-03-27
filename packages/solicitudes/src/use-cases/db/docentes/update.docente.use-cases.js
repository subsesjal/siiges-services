const { Logger } = require('@siiges-services/shared');

const updatedocente = (updateQuery) => async (identifierObj, changes) => {
  Logger.info('[docente/update]: Updating docente');
  const updatedDocente = await updateQuery(identifierObj, changes);
  Logger.info('[docente/updated] A docente was updated');

  return updatedDocente;
};

module.exports = updatedocente;
