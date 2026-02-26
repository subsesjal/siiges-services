const { checkers } = require('@siiges-services/shared');

const updatePlantel = (
  findOnePlantelQuery,
  updatePlantelQuery,
  updateDomicilioQuery,
  updatePersonaQuery,
  createDirectorQuery,
) => async (
  identifierObj,
  data,
) => {
  const { plantelId, institucionId } = identifierObj;

  const include = [{
    association: 'directores',
    include: [{ association: 'persona' }],
  }];

  const plantel = await findOnePlantelQuery(
    { id: plantelId, institucionId },
    { include, strict: false },
  );

  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const plantelUpdated = await updatePlantelQuery(
    { id: plantelId, institucionId },
    data,
  );

  const { domicilio, director } = data;
  const directorActual = plantel.directores?.[0];

  if (domicilio && checkers.IsDate(plantelUpdated) && plantel.domicilioId) {
    await updateDomicilioQuery(
      { id: plantel.domicilioId },
      domicilio,
    );
  }

  if (director && checkers.IsDate(plantelUpdated)) {
    if (directorActual?.personaId) {
      await updatePersonaQuery(
        { id: directorActual.personaId },
        director.persona,
      );
    } else {
      await createDirectorQuery(
        {
          plantelId: plantel.id,
          ...director,
        },
        [{ association: 'persona' }],
      );
    }
  }

  return plantelUpdated;
};

module.exports = updatePlantel;
