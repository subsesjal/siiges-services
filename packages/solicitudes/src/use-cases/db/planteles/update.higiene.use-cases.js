const { Logger } = require('@siiges-services/shared');

const updatehigiene = (updateHigieneQuery) => async (identifierObj, changes) => {
  Logger.info('[higiene/update]: Updating higiene');
  const higieneUpdated = await updateHigieneQuery(identifierObj, changes);
  Logger.info('[higiene/updated] A representante was updated');

  return higieneUpdated;
};

module.exports = updatehigiene;
