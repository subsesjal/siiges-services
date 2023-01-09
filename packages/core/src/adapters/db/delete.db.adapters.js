// Internal dependencies
const updateQuery = require('./update.db.adapters');

const deleteQuery = (model) => async (identifierObj) => {
  const update = updateQuery(model);
  const deletedAt = new Date().toISOString();

  const entryDeleted = await update(identifierObj, { deletedAt });
  return entryDeleted;
};

module.exports = deleteQuery;
