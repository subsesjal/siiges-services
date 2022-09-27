const { checkers } = require('@siiges-services/shared');

const createPlantelInstitucion = (findOneInstitucionQuery, createPlantelQuery) => async (
  identifierObj,
  data,
  include,
) => {
  const institucion = await findOneInstitucionQuery({ id: identifierObj });
  checkers.throwErrorIfDataIsFalsy(institucion);

  const newData = { institucionId: institucion.id, ...data };

  const newPlantelInstitucion = await createPlantelQuery(newData, include);
  return newPlantelInstitucion;
};

module.exports = createPlantelInstitucion;
