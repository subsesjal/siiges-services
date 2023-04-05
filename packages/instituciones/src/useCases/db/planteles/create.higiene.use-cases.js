const createHigiene = (createQuery) => async (data) => {
  // traer los id, traer el body, enviar en el query
  const { plantelId, higieneId, cantidad } = data;

  const newHigiene = await createQuery({
    plantelId,
    higieneId,
    cantidad,
  });

  return newHigiene;
};

module.exports = createHigiene;
