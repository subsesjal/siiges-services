const { Logger } = require('@siiges-services/shared');
const { includeFindOne } = require('../constants');

const deleteOne = (deleteQuery) => async (identifierObj) => {
  Logger.info('[representative/delete] Deleting  representative');
  const representativeDeleted = await deleteQuery(identifierObj, { include: includeFindOne });
  Logger.info('[representative/delete] representative deleted');

  return representativeDeleted;
};

module.exports = deleteOne;
