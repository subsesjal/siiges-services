const createEquivalencia = (
  createEquivalenciaQuery,
) => async (identifierObj) => {
  const equivalencia = await createEquivalenciaQuery(identifierObj);

  return equivalencia;
};

module.exports = { createEquivalencia };
