const { checkers } = require('@siiges-services/shared');

const findVigilanciasByVigilanteQuery = require('./db/vigilancias').findVigilanciasByVigilante;

const findVigilanciasByVigilante = () => async (vigilanteId) => {
  const vigilancias = await findVigilanciasByVigilanteQuery({ vigilanteId });

  checkers.throwErrorIfDataIsFalsy(vigilancias, 'vigilancias', vigilanteId);

  return vigilancias;
};

module.exports = findVigilanciasByVigilante;
