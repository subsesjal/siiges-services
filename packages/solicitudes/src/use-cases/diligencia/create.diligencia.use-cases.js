const { Logger } = require('@siiges-services/shared');

const create = (createQuery) => async (identifierObj, changes) => {
  Logger.info('[diligencia/create]: Creating diligencia');
  const diligence = await createQuery(identifierObj, changes);
  Logger.info('[diligencia/create]: Diligencia created');

  return diligence;
};

module.exports = create;
