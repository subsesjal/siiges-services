const { checkers } = require('@siiges-services/shared');

const updateCicloEscolar = (
  findOneCicloEscolarQuery,
  findOneProgramaQuery,
  updateCicloEscolarQuery,
) => async ({ id, data }) => {
  const { programaId } = data;
  // Validate
  await findOneCicloEscolarQuery({ id });
  await checkers.findValidator({ Programa: [programaId, findOneProgramaQuery] });

  const cicloEscolarUpdate = await updateCicloEscolarQuery({ id }, data);

  return cicloEscolarUpdate;
};

module.exports = { updateCicloEscolar };
