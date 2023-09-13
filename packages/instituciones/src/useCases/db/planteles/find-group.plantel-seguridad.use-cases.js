const { checkers } = require('@siiges-services/shared');

const findGroupPlantelSeguridad = (
  findOnePlantelQuery,
  findPlantelSeguridadQuery,
) => async (identifierObj) => {
  const { plantelId } = identifierObj;

  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const plantelSeguridad = await findPlantelSeguridadQuery(identifierObj);

  return plantelSeguridad;
};

module.exports = findGroupPlantelSeguridad;
