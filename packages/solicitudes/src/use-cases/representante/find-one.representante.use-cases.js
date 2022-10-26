const { Logger } = require('@siiges-services/shared');

const find = (findOneQuery) => async (identifierObj) => {
  Logger.info('[representative/find] Searching  representative');
  const representative = await findOneQuery(identifierObj);
  Logger.info('[representative/find] representative search finish');

  return representative;
};

module.exports = find;
