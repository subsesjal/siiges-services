const { Logger, checkers } = require('@siiges-services/shared');

const find = (findOneQuery) => async (identifierObj) => {
  Logger.info('[diligence/find] Searching  diligence');
  const include = ['persona'];
  const diligencia = await findOneQuery(identifierObj, { include });
  checkers.throwErrorIfDataIsFalsy(diligencia, 'diligencias', identifierObj.id);

  return {
    ...diligencia.dataValues,
    persona: { ...diligencia.dataValues.persona.dataValues },
  };
};

module.exports = find;
