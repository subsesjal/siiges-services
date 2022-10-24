// Internal dependencies
const findOneQuery = require('./find-one.db.adapter');
const { getWhere } = require('../utils');

const updateQuery = (model) => async (identifierObj, changes, dbParams = {}) => {
  const { isDeleting = false } = dbParams;
  const updatedAt = new Date().toISOString();
  const entryChanges = { ...changes, updatedAt };

  await model.update(
    entryChanges,
    {
      where: getWhere(identifierObj, isDeleting),
    },
  );

  return updatedAt;
};

const updateAndFindQuery = (model) => async (identifierObj, changes, dbParams = {}) => {
  const update = updateQuery(model);
  const findOne = findOneQuery(model);

  await update(identifierObj, changes, dbParams);
  const entryUpdated = await findOne(identifierObj, dbParams);

  return entryUpdated;
};

module.exports = {
  updateQuery,
  updateAndFindQuery,
};
