const { Logger } = require('@siiges-services/shared');

const deleteOne = (deleteQuery) => async (identifierObj) => {
  Logger.info('[diligencia/delete]: Deleting diligencia');
  const diligence = await deleteQuery(identifierObj);
  Logger.info('[diligencia/delete]: Diligencia deleted');

  return diligence;
};

module.exports = deleteOne;
