const { Logger } = require('@siiges-services/shared');

const update = (updateQuery) => async (identifierObj, changes) => {
  Logger.info('[diligencia/update]: Updating diligencia');
  const diligence = await updateQuery(identifierObj, changes);
  Logger.info('[diligencia/update]: Diligencia updated');

  return diligence;
};

module.exports = update;
