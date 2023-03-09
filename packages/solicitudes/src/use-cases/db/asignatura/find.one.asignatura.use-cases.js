const { Logger } = require('@siiges-services/shared');

const findOneAsignatura = (findOneQuery) => async (identifierObj) => {
  Logger.info('[asignatura/find] Searching  asignatura');
  const include = ['programa'];
  const asignatura = await findOneQuery(identifierObj, { include });
  Logger.info('[asignatura/find] Asignatura search finish');
  return {
    ...asignatura.dataValues,
    programa: { ...asignatura.dataValues.programa.dataValues },
  };
};

module.exports = findOneAsignatura;
