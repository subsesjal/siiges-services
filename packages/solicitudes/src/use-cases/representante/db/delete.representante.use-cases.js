const { Logger } = require('@siiges-services/shared');

const deleteOne = (deleteQuery) => async (identifierObj) => {
  Logger.info('[representative/delete] Deleting  representative');
  const representativeDeleted = await deleteQuery(identifierObj);
  Logger.info('[representative/delete] representative deleted');

  return representativeDeleted;
};

module.exports = deleteOne;
