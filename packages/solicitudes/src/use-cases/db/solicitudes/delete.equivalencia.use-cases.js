const deleteEquivalencia = (deleteEquivalenciaQuery) => async (identifierObj) => {
  const equivalenciaId = identifierObj.id;
  const equivalenciaDeleted = await deleteEquivalenciaQuery({ id: equivalenciaId });

  return equivalenciaDeleted;
};

module.exports = deleteEquivalencia;
