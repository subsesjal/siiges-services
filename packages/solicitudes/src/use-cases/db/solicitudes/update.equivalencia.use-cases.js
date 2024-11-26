const updateEquivalencia = (updateEquivalenciaQuery) => async (equiv, solicitudRevEquivId) => {
  const equivalencia = await updateEquivalenciaQuery({ id: solicitudRevEquivId }, equiv);
  return equivalencia;
};

module.exports = updateEquivalencia;
