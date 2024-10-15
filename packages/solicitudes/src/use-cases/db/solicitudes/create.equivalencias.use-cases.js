function createEquivalencia(createEquivalenciaQuery) {
  return async (data) => {
    const newEquivalencia = await createEquivalenciaQuery(data);
    return newEquivalencia;
  };
}

module.exports = createEquivalencia;
