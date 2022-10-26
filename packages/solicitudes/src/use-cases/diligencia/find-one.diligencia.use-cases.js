const { Logger } = require('@siiges-services/shared');

const find = (findOneQuery) => async (identifierObj) => {
  Logger.info('[diligence/find] Searching  diligence');
  const diligence = await findOneQuery(identifierObj);
  Logger.info('[diligence/find] Diligence search finish');

  return diligence;
};

module.exports = find;
