const { checkers } = require('@siiges-services/shared');

const deleteSaludInstitucion = (
  findOnePlantelQuery,
  findOneSaludInstitucionQuery,
  deleteSaludInstitucionesQuery,
) => async (identifierObj) => {
  const { plantelId, saludInstitucionId } = identifierObj;

  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const saludInstitucion = await findOneSaludInstitucionQuery({ id: saludInstitucionId });
  checkers.throwErrorIfDataIsFalsy(saludInstitucion, 'salud_instituciones', saludInstitucionId);

  const saludInstitucionDeleted = await deleteSaludInstitucionesQuery({ id: saludInstitucionId });

  return saludInstitucionDeleted;
};

module.exports = { deleteSaludInstitucion };
