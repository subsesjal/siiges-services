const { Logger } = require('@siiges-services/shared');

const find = (findOneQuery) => async (identifierObj) => {
  Logger.info('[institution/find] Searching  institution');
  const institution = await findOneQuery(identifierObj);
  Logger.info('[institution/find] institution search finish');

  return institution;
};

module.exports = find;
