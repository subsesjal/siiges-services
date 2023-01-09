const { checkers } = require('@siiges-services/shared');

const createPlantel = (findOneInstitucionQuery, createPlantelQuery) => async (
  id,
  data,
  include,
) => {
  const institucion = await findOneInstitucionQuery({ id });
  checkers.throwErrorIfDataIsFalsy(institucion);

  const newData = { institucionId: institucion.id, ...data };

  const newPlantelInstitucion = await createPlantelQuery(newData, include);
  return newPlantelInstitucion;
};

module.exports = createPlantel;
