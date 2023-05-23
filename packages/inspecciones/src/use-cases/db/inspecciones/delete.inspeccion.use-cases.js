const { checkers } = require('@siiges-services/shared');

const deleteInspeccion = (findOneQuery, deleteQuery) => async (identifierObj) => {
  const inspeccion = await findOneQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(inspeccion, 'inspecciones', identifierObj.id);

  const inspeccionDeleted = await deleteQuery(identifierObj);
  return inspeccionDeleted;
};

module.exports = deleteInspeccion;
