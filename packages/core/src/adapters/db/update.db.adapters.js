const { Op } = require('sequelize');

const updateQuery = (model) => async (identifierObj, changes) => {
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
  );

  return entryUpdated;
};

module.exports = updateQuery;
