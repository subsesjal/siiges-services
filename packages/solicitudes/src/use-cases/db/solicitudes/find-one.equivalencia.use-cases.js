const { checkers } = require('@siiges-services/shared');

const findOneEquivalencia = (findOneEquivalenciaQuery) => async (identifierObj) => {
  const equivalencia = await findOneEquivalenciaQuery(identifierObj, {
    undefined,
    strict: false,
  });

  checkers.throwErrorIfDataIsFalsy(equivalencia, 'solicitudes', identifierObj.equivalenciaId);

  return equivalencia;
};

module.exports = findOneEquivalencia;
