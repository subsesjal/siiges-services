const createEquivalencia = (
  createEquivalenciaQuery,
) => async ({ data }) => {
  const newEquivalencia = await createEquivalenciaQuery(data);
  return newEquivalencia;
};
module.exports = createEquivalencia;
