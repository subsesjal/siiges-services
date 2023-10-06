const { checkers } = require('@siiges-services/shared');

const findGroupGrupo = (findGroupGrupoQuery) => async (identifierObj) => {
  const grupo = await findGroupGrupoQuery(identifierObj);
  checkers.throwErrorIfDataIsFalsy(!!grupo.length, 'Grupo', identifierObj.cicloEscolarId);

  return grupo;
};

module.exports = { findGroupGrupo };
