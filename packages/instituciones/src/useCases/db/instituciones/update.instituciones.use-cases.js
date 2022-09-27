const updateInstitucion = (updateQuery) => async (identifierObj, data) => {
  const institucionUpdated = await updateQuery(identifierObj, data);
  return institucionUpdated;
};

module.exports = updateInstitucion;
