const { checkers } = require('@siiges-services/shared');

const updateSaludInstitucion = (
  findOneSaludInstitucionesQuery,
  updateSaludInstitucionesQuery,
) => async (identifierObj) => {
  const { id, body } = identifierObj;
  const saludInstitucion = await findOneSaludInstitucionesQuery({ id });
  checkers.throwErrorIfDataIsFalsy(saludInstitucion, 'SaludInstitucion', id);

  const saludInstitucionUpdate = await updateSaludInstitucionesQuery({ id }, body);
  return saludInstitucionUpdate;
};

module.exports = { updateSaludInstitucion };
