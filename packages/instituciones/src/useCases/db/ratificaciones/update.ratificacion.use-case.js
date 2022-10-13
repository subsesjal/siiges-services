const { checkers } = require('@siiges-services/shared');

const updateRatificacion = (findOneInstitucionQuery, updateRatificacionQuery) => async (
  identifierObj,
  data,
) => {
  const { institucionId, ratificacionId } = identifierObj;

  const institucion = await findOneInstitucionQuery({ id: institucionId });
  checkers.throwErrorIfDataIsFalsy(institucion);

  const ratificacionUpdated = await updateRatificacionQuery({
    id: ratificacionId,
    institucionId,
  }, data);
  return ratificacionUpdated;
};

module.exports = updateRatificacion;
