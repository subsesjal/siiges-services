const deleteEquivalencia = (deleteEquivalenciaQuery) => async (identifierObj) => {
  const equivalenciaDeleted = await deleteEquivalenciaQuery(identifierObj);

  return equivalenciaDeleted;
};

module.exports = deleteEquivalencia;
