const { Logger } = require('@siiges-services/shared');

const update = (updateQuery) => async (identifierObj, changes) => {
  Logger.info('[representante/update]: Updating representante');
  const solicitudUpdated = await updateQuery(identifierObj, changes);
  Logger.info('[representante/updated] A representante was updated');

  return solicitudUpdated;
};

module.exports = update;
