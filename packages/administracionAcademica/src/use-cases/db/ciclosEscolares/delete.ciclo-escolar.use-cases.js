const deleteCicloEscolar = (
  findOneCicloEscolarQuery,
  deleteCicloEscolarQuery,
) => async ({ id }) => {
  await findOneCicloEscolarQuery({ id });

  const cicloEscolarDeleted = await deleteCicloEscolarQuery({ id });

  return cicloEscolarDeleted;
};

module.exports = { deleteCicloEscolar };
