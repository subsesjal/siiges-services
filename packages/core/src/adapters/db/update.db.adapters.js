// External dependencies
const { Op } = require('sequelize');
// Internal dependencies
const findOneQuery = require('./find-one.db.adapter');

const updateQuery = (model) => async (identifierObj, changes) => {
  const updatedAt = new Date().toISOString();
  const entryChanges = { ...changes, updatedAt };

  await model.update(
    entryChanges,
    {
      where: {
        ...identifierObj,
        deletedAt: { [Op.is]: null },
      },
    },
  );
};

const updateAndFindQuery = (model) => async (identifierObj, changes) => {
  const update = updateQuery(model);
  const findOne = findOneQuery(model);

  await update(identifierObj, changes);
  const entryUpdated = await findOne(identifierObj);

  return entryUpdated;
};

module.exports = {
  updateQuery,
  updateAndFindQuery,
};
