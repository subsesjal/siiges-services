const { Op } = require('sequelize');

const updateQuery = (model) => async (identifierObj, changes, includes) => {
  const updatedAt = new Date().toISOString();
  const entryChanges = { ...changes, updatedAt };
  const entryUpdated = await model.update(
    entryChanges,
    {
      where: {
        ...identifierObj,
        deletedAt: { [Op.is]: null },
      },
    },
    includes,
  );

  return entryUpdated;
};

module.exports = updateQuery;
