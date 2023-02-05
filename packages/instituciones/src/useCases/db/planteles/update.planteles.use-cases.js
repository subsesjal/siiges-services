const { checkers } = require('@siiges-services/shared');

const updatePlantel = (
  findOnePlantelQuery,
  updatePlantelQuery,
  updateDomicilioQuery,
  updatePersonaQuery,
) => async (
  identifierObj,
  data,
) => {
  const { plantelId, institucionId } = identifierObj;

  const include = [{
    association: 'directores',
    include: [{ association: 'persona' }],
  }];

  const plantel = await findOnePlantelQuery({ id: plantelId, institucionId }, {
    undefined,
    include,
    strict: false,
  });

  console.log(plantel.directores[0].personaId);

  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const plantelUpdated = await updatePlantelQuery({ id: plantelId, institucionId }, data);

  const { domicilio, director } = data;

  if (domicilio && (checkers.IsDate(plantelUpdated)) && plantel.domicilioId) {
    await updateDomicilioQuery({ id: plantel.domicilioId }, domicilio);
  }

  if (director && (checkers.IsDate(plantelUpdated)) && plantel.directores[0].personaId) {
    await updatePersonaQuery({ id: plantel.directores[0].personaId }, director.persona);
  }

  return plantelUpdated;
};

module.exports = updatePlantel;
