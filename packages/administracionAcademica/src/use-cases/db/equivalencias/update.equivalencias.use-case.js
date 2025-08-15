const updateEquivalencia = (
  updateEquivalenciaQuery,
) => async ({ id, data }) => {
  const cicloEscolarUpdate = await updateEquivalenciaQuery({ id }, data);

  return cicloEscolarUpdate;
};

module.exports = { updateEquivalencia };
