const findAllEquivalencias = (
  findAllEquivalenciasQuery,
) => async () => {
  const equivalencias = await findAllEquivalenciasQuery();
  return equivalencias;
};

module.exports = findAllEquivalencias;
