const { checkers } = require('@siiges-services/shared');

const createRatificacion = (findOneInstitucionQuery, createRatificacionQuery) => async (
  id,
  data,
  include,
) => {
  const institucion = await findOneInstitucionQuery({ id });

  checkers.throwErrorIfDataIsFalsy(institucion);

  const newData = { institucionId: institucion.id, ...data };

  const newPlantelInstitucion = await createRatificacionQuery(newData, include);
  return newPlantelInstitucion;
};

module.exports = createRatificacion;
