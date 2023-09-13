const { checkers } = require('@siiges-services/shared');

const deleteSaludInstitucion = (
  findOneSaludInstitucionesQuery,
  deleteSaludInstitucionesQuery,
) => async (identifierObj) => {
  const saludInstitucion = await findOneSaludInstitucionesQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(saludInstitucion, 'SaludInstitucion', identifierObj.id);

  await deleteSaludInstitucionesQuery(identifierObj);
  return saludInstitucion;
};

module.exports = { deleteSaludInstitucion };
