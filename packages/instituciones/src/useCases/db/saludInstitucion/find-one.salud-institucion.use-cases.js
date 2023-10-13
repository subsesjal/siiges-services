const { checkers } = require('@siiges-services/shared');

const findOneSaludInstituciones = (
  findOneSaludInstitucionQuery,
  findOnePlantelQuery,
) => async (identifierObj) => {
  const { saludInstitucionId, plantelId } = identifierObj;

  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const saludInstitucion = await findOneSaludInstitucionQuery({ id: saludInstitucionId });
  checkers.throwErrorIfDataIsFalsy(saludInstitucion, 'salud_instituciones', saludInstitucionId);

  return saludInstitucion;
};

module.exports = { findOneSaludInstituciones };
