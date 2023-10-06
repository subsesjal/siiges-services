const { checkers } = require('@siiges-services/shared');

const createCicloEscolar = (
  findOneProgramaQuery,
  createCicloEscolarQuery,
) => async (identifierObj) => {
  const { programaId: id } = identifierObj;
  await checkers.findValidator({ Programa: [id, findOneProgramaQuery] });

  const cicloEscolar = await createCicloEscolarQuery(identifierObj);

  return cicloEscolar;
};

module.exports = { createCicloEscolar };
