const { checkers } = require('@siiges-services/shared');

const updatePlantel = (updatePlantelQuery, findOnePlantelQuery, updateDomicilioQuery) => async (
  identifierObj,
  data,
) => {
  const { plantelId, institucionId } = identifierObj;

  const plantel = await findOnePlantelQuery({ id: plantelId, institucionId });
  checkers.throwErrorIfDataIsFalsy(plantel);

  const plantelUpdated = await updatePlantelQuery({ id: plantelId, institucionId }, data);

  const { domicilio } = data;
  if (domicilio && plantelUpdated[0] === 1) {
    await updateDomicilioQuery({ id: plantel.domicilioId }, domicilio);
  }

  return plantelUpdated;
};

module.exports = updatePlantel;
