const updateHigiene = (updateQuery) => async (identifierObj, data) => {
  const higieneUpdated = await updateQuery(identifierObj, data);
  return higieneUpdated;
};

module.exports = updateHigiene;
