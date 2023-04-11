const createHigiene = (createQuery) => async (data) => {
  const { plantelId, higieneId, cantidad } = data;

  const newHigiene = await createQuery({
    plantelId,
    higieneId,
    cantidad,
  });

  return newHigiene;
};

module.exports = createHigiene;
