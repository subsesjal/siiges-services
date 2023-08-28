const { checkers } = require('@siiges-services/shared');

const findGroupPlantelHigiene = (
  findOnePlantelQuery,
  findAllPlantelNivelesQuery,
) => async (identifierObj) => {
  const { plantelId } = identifierObj;

  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const plantelNiveles = await findAllPlantelNivelesQuery(identifierObj);

  return plantelNiveles;
};

module.exports = findGroupPlantelHigiene;
