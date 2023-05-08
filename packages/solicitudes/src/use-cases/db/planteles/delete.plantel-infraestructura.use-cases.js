const { checkers } = require('@siiges-services/shared');

const deletePlantelInfraestructura = (
  findOneInfraestructuraQuery,
  deleteInfraestructuraQuery,
) => async (identifierObj) => {
  const { plantelId, infraestructuraId } = identifierObj;

  const infraestructura = await findOneInfraestructuraQuery({ id: infraestructuraId, plantelId });
  checkers.throwErrorIfDataIsFalsy(infraestructura, 'infraestructuras', infraestructuraId);

  const infraestructuraDeleted = await deleteInfraestructuraQuery({
    id: infraestructuraId,
    plantelId,
  });

  return infraestructuraDeleted;
};

module.exports = deletePlantelInfraestructura;
