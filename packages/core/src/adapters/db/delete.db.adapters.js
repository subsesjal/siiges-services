// Internal dependencies
const { updateQuery, updateAndFindQuery } = require('./update.db.adapters');

const deleteAndFindQuery = (model) => async (identifierObj) => {
  const update = updateAndFindQuery(model);
  const deletedAt = new Date().toISOString();
  await update(identifierObj, { deletedAt });
};

const deleteQuery = (model) => async (identifierObj) => {
  const update = updateQuery(model);
  const deletedAt = new Date().toISOString();
  const entryDeleted = await update(identifierObj, { deletedAt });

  return entryDeleted;
};

module.exports = {
  deleteQuery,
  deleteAndFindQuery,
};
