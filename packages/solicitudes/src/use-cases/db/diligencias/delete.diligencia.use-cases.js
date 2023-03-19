const { checkers } = require('@siiges-services/shared');

const deleteOne = (findOneQuery, deleteQuery) => async (identifierObj) => {
  const diligencia = await findOneQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(diligencia, 'diligencias', identifierObj.id);

  const diligenciaDeleted = await deleteQuery(identifierObj);
  return diligenciaDeleted;
};

module.exports = deleteOne;
