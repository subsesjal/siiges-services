const { checkers } = require('@siiges-services/shared');

const createDirectorPlantel = (findOnePlantelQuery, createDirectorPlantelQuery) => async (
  id,
  data,
  include,
) => {
  const plantel = await findOnePlantelQuery({ id });
  checkers.throwErrorIfDataIsFalsy(plantel);

  const newData = { plantelId: plantel.id, ...data };

  const newDirectorPlantel = await createDirectorPlantelQuery(newData, include);
  return newDirectorPlantel;
};

module.exports = createDirectorPlantel;
