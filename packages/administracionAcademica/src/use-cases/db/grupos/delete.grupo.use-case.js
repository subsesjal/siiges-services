const deleteGrupo = (
  findOneGrupoQuery,
  deleteGrupoQuery,
) => async ({ id }) => {
  await findOneGrupoQuery({ id });

  const grupoDeleted = await deleteGrupoQuery({ id });

  return grupoDeleted;
};

module.exports = { deleteGrupo };
