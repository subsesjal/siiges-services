const { checkers } = require('@siiges-services/shared');

const findPlantelSaludInstituciones = (
  findAllSaludInstitucionesQuery,
  findOnePlantelQuery,
) => async (identifierObj) => {
  const { plantelId } = identifierObj;

  const plantel = findOnePlantelQuery;
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const allSaludInstituciones = await findAllSaludInstitucionesQuery({ plantelId });

  return allSaludInstituciones;
};

module.exports = { findPlantelSaludInstituciones };
