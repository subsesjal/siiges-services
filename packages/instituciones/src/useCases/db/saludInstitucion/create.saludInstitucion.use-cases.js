const { checkers } = require('@siiges-services/shared');

const createSaludInstitucion = (
  createSaludInstitucionQuery,
  findOnePlantelQuery,
) => async (identifierObj) => {
  const { plantelId } = identifierObj;

  const plantel = await findOnePlantelQuery({ id: plantelId });
  checkers.throwErrorIfDataIsFalsy(plantel, 'Instituciones', plantelId);

  const institucionSalud = await createSaludInstitucionQuery(identifierObj);

  return institucionSalud;
};

module.exports = createSaludInstitucion;
