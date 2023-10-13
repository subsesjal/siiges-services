const { checkers } = require('@siiges-services/shared');

const updateSaludInstitucion = (
  findOnePlantelQuery,
  findOneSaludInstitucionQuery,
  updateSaludInstitucionQuery,
) => async (identifierObj, changes) => {
  const { saludInstitucionId, plantelId } = identifierObj;

  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const saludInstitucion = await findOneSaludInstitucionQuery({ id: saludInstitucionId });
  checkers.throwErrorIfDataIsFalsy(saludInstitucion, 'salud_instituciones', saludInstitucionId);

  const saludInstitucionUpdated = await updateSaludInstitucionQuery(
    { id: saludInstitucionId },
    changes,
  );
  return saludInstitucionUpdated;
};

module.exports = { updateSaludInstitucion };
