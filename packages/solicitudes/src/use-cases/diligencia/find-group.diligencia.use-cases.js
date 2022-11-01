const { Logger } = require('@siiges-services/shared');

const find = (findGroupQuery) => async (identifierObj) => {
  Logger.info('[diligence/find] Searching all diligences in a solicitud');
  const diligence = await findGroupQuery(identifierObj);
  Logger.info('[diligence/find] Diligences search finish');

  return diligence;
};

module.exports = find;
