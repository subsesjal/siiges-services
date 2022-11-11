const { Logger } = require('@siiges-services/shared');

const update = (updateQuery) => async (identifierObj, changes) => {
  Logger.info('[representante/update]: Updating representante');
  const representativeUpdated = await updateQuery(identifierObj, changes);
  Logger.info('[representante/updated] A representante was updated');

  return representativeUpdated;
};

module.exports = update;
