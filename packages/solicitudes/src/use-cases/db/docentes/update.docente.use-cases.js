const { Logger } = require('@siiges-services/shared');

const update = (updateQuery) => async (identifierObj, changes) => {
  Logger.info('[docente/update]: Updating representante');
  const updatedDocente = await updateQuery(identifierObj, changes);
  Logger.info('[docente/updated] A representante was updated');

  return updatedDocente;
};

module.exports = update;
