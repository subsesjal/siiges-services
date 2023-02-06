const { Logger } = require('@siiges-services/shared');
const { includeFindOne } = require('../constants');

const findOne = (findOneQuery) => async (identifierObj) => {
  Logger.info('[representative/find] Searching  representative');
  const representative = await findOneQuery(identifierObj, { include: includeFindOne });
  Logger.info('[representative/find] representative search finish');

  return representative;
};

module.exports = findOne;
