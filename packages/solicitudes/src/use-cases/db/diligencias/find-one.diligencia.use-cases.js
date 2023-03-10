const { Logger } = require('@siiges-services/shared');

const find = (findOneQuery) => async (identifierObj) => {
  Logger.info('[diligence/find] Searching  diligence');
  const include = ['persona'];
  const diligence = await findOneQuery(identifierObj, { include });
  Logger.info('[diligence/find] Diligence search finish');
  return {
    ...diligence.dataValues,
    persona: { ...diligence.dataValues.persona.dataValues },
  };
};

module.exports = find;
