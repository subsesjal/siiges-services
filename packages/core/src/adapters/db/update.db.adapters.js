const updateQuery = (model) => async (identifierObj, changes) => {
  const updatedAt = new Date().toISOString();
  const entryChanges = { ...changes, updatedAt };
  const entryUpdated = await model.update(entryChanges, { ...identifierObj });

  return entryUpdated;
};

module.exports = updateQuery;
