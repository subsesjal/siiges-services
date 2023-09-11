const { checkers } = require('@siiges-services/shared');

const findOneSaludInstituciones = (findOneSaludInstitucionesQuery) => async (identifierObj) => {
  const saludInstitucion = await findOneSaludInstitucionesQuery({ id: identifierObj });
  checkers.throwErrorIfDataIsFalsy(saludInstitucion, 'SaludInstitucion', identifierObj);

  return saludInstitucion;
};

module.exports = { findOneSaludInstituciones };
