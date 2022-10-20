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
      },
    },
  );
};

const updateAndFindQuery = (model) => async (identifierObj, changes, dbParams = {}) => {
  const { isDeleteing = false } = dbParams;
  const update = updateQuery(model);
  const findOne = findOneQuery(model);

  await update(identifierObj, changes);
  const entryUpdated = await findOne(identifierObj, isDeleteing);

  return entryUpdated;
};

module.exports = {
  updateQuery,
  updateAndFindQuery,
};
