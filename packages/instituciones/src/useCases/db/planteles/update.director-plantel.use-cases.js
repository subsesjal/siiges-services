const { checkers } = require('@siiges-services/shared');

const updateDirectorPlantel = (updateDirectorQuery, findOnePlantelQuery) => async (
  identifierObj,
  data,
) => {
  const { plantelId, directorId } = identifierObj;

  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel);

  const directorUpdated = await updateDirectorQuery({ id: directorId, plantelId }, data);

  return directorUpdated;
};

module.exports = updateDirectorPlantel;
