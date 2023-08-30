const { checkers } = require('@siiges-services/shared');

const deleteInspectoresProgramas = (
  findOneInspectoresProgramasQuery,
  deleteInspectoresProgramasQuery,
) => async (identifierObj) => {
  const inspeccion = await findOneInspectoresProgramasQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(inspeccion, 'Inspectores-programas', identifierObj.id);

  const inspeccionDeleted = await deleteInspectoresProgramasQuery(identifierObj);
  return inspeccionDeleted;
};

module.exports = deleteInspectoresProgramas;
