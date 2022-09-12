// Internal dependencies
const updateQuery = require('./update.db.adapters');

const deleteQuery = (model) => async (id) => {
  const update = updateQuery(model);
  const deletedAt = new Date().toISOString();

  const entryDeleted = await update(id, { deletedAt });

  return entryDeleted;
};

module.exports = deleteQuery;
