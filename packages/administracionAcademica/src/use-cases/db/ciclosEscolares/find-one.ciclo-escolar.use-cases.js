const { checkers } = require('@siiges-services/shared');

const findOneCicloEscolar = (findOneCicloEscolarQuery) => async ({ id }) => {
  const cicloEscolar = await findOneCicloEscolarQuery({ id });
  checkers.throwErrorIfDataIsFalsy(cicloEscolar, 'Ciclo Escolar', id);

  return cicloEscolar;
};

module.exports = { findOneCicloEscolar };
