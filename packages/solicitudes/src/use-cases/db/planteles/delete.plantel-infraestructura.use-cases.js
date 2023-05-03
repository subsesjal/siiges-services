const { checkers } = require('@siiges-services/shared');

const deletePlantelInfraestructura = (
  deleteInfraestructuraQuery,
) => async (identifierObj) => {
  const infraestructuraDeleted = await deleteInfraestructuraQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(infraestructuraDeleted, 'infraestructura', identifierObj.id);

  return infraestructuraDeleted;
};

module.exports = deletePlantelInfraestructura;
