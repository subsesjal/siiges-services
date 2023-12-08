const { checkers } = require('@siiges-services/shared');

const findVigilanciasByVigilante = (findVigilanciasByVigilanteQuery) => async ({ vigilanteId }) => {
  const findvigilancias = await findVigilanciasByVigilanteQuery({ vigilanteId });
  checkers.throwErrorIfDataIsFalsy(findvigilancias.legth, 'vigilancia', vigilanteId);

  return findvigilancias;
};

module.exports = findVigilanciasByVigilante;
