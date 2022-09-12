// Internal dependencies
const updateQuery = require('./update.db.adapters');

const deleteQuery = (model) => async (identifierObj) => {
  const update = updateQuery(model);
  const deletedAt = new Date().toISOString();

  const entryDeleted = await update(identifierObj, { deletedAt });
<<<<<<< HEAD
=======

>>>>>>> 54af6d9 (feat(core/adapters):  refactor core adapters to be more general)
  return entryDeleted;
};

module.exports = deleteQuery;
