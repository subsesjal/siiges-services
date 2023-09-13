const { checkers } = require('@siiges-services/shared');

const findPlantelSaludInstituciones = (findAllSaludInstitucionesQuery) => async (identifierObj) => {
  const allSaludInstituciones = await findAllSaludInstitucionesQuery(identifierObj);
  if (allSaludInstituciones.length === 0) {
    checkers.throwErrorIfDataIsFalsy(null, 'SaludInstituciones', identifierObj.plantelId);
  }
  return allSaludInstituciones;
};

module.exports = { findPlantelSaludInstituciones };
