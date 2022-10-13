const { checkers } = require('@siiges-services/shared');

const findOneRatificacion = (findOneInstitucionQuery, findOneRatificacionQuery) => async (
  identifierObj,
) => {
  const { institucionId, ratificacionId } = identifierObj;

  const institucion = await findOneInstitucionQuery({ id: institucionId });
  checkers.throwErrorIfDataIsFalsy(institucion);

  const include = [{ association: 'institucion' }];

  const ratificacion = await findOneRatificacionQuery({
    id: ratificacionId,
    institucionId,
  }, { undefined, include });
  checkers.throwErrorIfDataIsFalsy(ratificacion);

  return ratificacion;
};

module.exports = findOneRatificacion;
