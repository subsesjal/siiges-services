const createPlantelHigiene = (findOneQuery, createQuery, updateQuery) => async (
  identifierObject,
  data,
) => {
  const { plantelId } = identifierObject;

  const result = await Promise.all(data.map(async (item) => {
    const { higieneId, cantidad } = item;

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
  }));

  return result;
};

module.exports = createPlantelHigiene;
