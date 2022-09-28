const deletePlantel = (deleteQuery) => async (identifierObject) => {
  const { institucionId, plantelId } = identifierObject;

  const plantelDeleted = await deleteQuery({ id: plantelId, institucionId });
  return plantelDeleted;
};

module.exports = deletePlantel;
