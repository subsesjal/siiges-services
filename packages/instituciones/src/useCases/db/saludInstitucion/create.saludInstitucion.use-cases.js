const { checkers } = require('@siiges-services/shared');

const createSaludInstitucion = (
  createSaludInstitucionQuery,
  findOnePlantelQuery,
) => async (identifierObj, data) => {
  const { plantelId } = identifierObj;

  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'planteles', plantelId);

  const saludInstitucion = await createSaludInstitucionQuery({
    ...data,
    plantelId,
  });

  return saludInstitucion;
};

module.exports = createSaludInstitucion;
