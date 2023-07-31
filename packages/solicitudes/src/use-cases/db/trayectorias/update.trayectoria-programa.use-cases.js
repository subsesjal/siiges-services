const { checkers } = require('@siiges-services/shared');

const updateTrayectoriaPrograma = (
  findOneTrayectoriaQuery,
  updateTrayectoriaQuery,
) => async (identifierObj, changes) => {
  const { trayectoriaId } = identifierObj;
  const trayectoria = await findOneTrayectoriaQuery({ id: trayectoriaId });
  checkers.throwErrorIfDataIsFalsy(trayectoria, 'trayectorias', trayectoriaId);

  const trayectoriaUpdated = await updateTrayectoriaQuery({ id: trayectoriaId }, changes);

  return trayectoriaUpdated;
};

module.exports = updateTrayectoriaPrograma;
