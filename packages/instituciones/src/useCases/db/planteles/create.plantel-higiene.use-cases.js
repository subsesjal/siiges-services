const createPlantelHigiene = (findOneQuery, createQuery, updateQuery) => async (data) => {
  const { plantelId, higieneId, cantidad } = data;

  const existingPlantelHigiene = await findOneQuery({ plantelId, higieneId });

  if (existingPlantelHigiene) {
    const updatedPlantelHigiene = await updateQuery(
      { id: existingPlantelHigiene.id },
      { cantidad },
    );
    return updatedPlantelHigiene;
  }
  const newPlantelHigiene = await createQuery({ plantelId, higieneId, cantidad });
  return newPlantelHigiene;
};

module.exports = createPlantelHigiene;
