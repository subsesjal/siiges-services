const { Logger } = require('@siiges-services/shared');

const update = (updateQuery) => async (identifierObj, changes) => {
  Logger.info('[diligencia/update]: Updating diligencia');
  const updatedDiligencia = await updateQuery(identifierObj, changes);
  Logger.info('[diligencia/update]: Diligencia updated');

  return updatedDiligencia;
};

module.exports = update;
