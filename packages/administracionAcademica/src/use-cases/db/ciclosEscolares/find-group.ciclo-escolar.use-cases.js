const { checkers } = require('@siiges-services/shared');

const findGroupCicloEscolar = (findGroupCicloEscolarQuery) => async (identifierObj) => {
  const cicloEscolar = await findGroupCicloEscolarQuery({ programaId: identifierObj });
  checkers.throwErrorIfDataIsFalsy(!!cicloEscolar.length, 'Ciclo Escolar', identifierObj.programaId);

  return cicloEscolar;
};

module.exports = { findGroupCicloEscolar };
