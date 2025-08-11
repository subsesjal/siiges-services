const { checkers } = require('@siiges-services/shared');

const createCicloEscolar = (
  findOneProgramaQuery,
  findOneCicloEscolarQuery,
  createCicloEscolarQuery,
) => async (data) => {
  const { programaId, nombre } = data;
  await checkers.findValidator({ Programa: [programaId, findOneProgramaQuery] });

  const exists = await findOneCicloEscolarQuery({ programaId, nombre });

  if (exists) {
    throw new Error(`El ciclo escolar ${nombre} ya existe para este programa`);
  }

  return createCicloEscolarQuery(data);
};

module.exports = { createCicloEscolar };
