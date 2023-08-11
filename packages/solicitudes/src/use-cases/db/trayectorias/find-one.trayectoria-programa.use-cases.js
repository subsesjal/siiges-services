const { checkers } = require('@siiges-services/shared');

const findOneTrayectoria = (findOneTrayectoriaQuery) => async (identifierObj) => {
  const trayectoria = await findOneTrayectoriaQuery(identifierObj);

  checkers.throwErrorIfDataIsFalsy(trayectoria, 'trayectorias', identifierObj.programaId);

  return trayectoria;
};

module.exports = findOneTrayectoria;
