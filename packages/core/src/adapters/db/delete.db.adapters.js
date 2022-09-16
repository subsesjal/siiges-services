// Internal dependencies
const { updateQuery, findAndUpdateQuery } = require('./update.db.adapters');

const deleteQuery = (model) => async (identifierObj) => {
  const update = updateQuery(model);
  const deletedAt = new Date().toISOString();

  const entryDeleted = await update(identifierObj, { deletedAt });
<<<<<<< HEAD
=======

>>>>>>> 54af6d9 (feat(core/adapters):  refactor core adapters to be more general)
  return entryDeleted;
};

const findAndDeleteQuery = (model) => async (identifierObj) => {
  const update = findAndUpdateQuery(model);
  const deletedAt = new Date().toISOString();

  const entryDeleted = await update(identifierObj, { deletedAt });

  return entryDeleted;
};

module.exports = {
  deleteQuery,
  findAndDeleteQuery,
};
