const updatePlantelHigiene = (updateQuery) => async (data) => {
  const { plantelId, higieneId, cantidad } = data;

  const plantelHigieneUpdated = await updateQuery({ plantelId, higieneId }, { cantidad });

  return plantelHigieneUpdated;
};

module.exports = updatePlantelHigiene;
