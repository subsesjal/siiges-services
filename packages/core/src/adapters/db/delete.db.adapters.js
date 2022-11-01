// Internal dependencies
const { updateQuery } = require('./update.db.adapters');
const findOneQuery = require('./find-one.db.adapter');

function createDeleteEntry(deletedEntry, deletedAt, updatedAt) {
  return {
    ...deletedEntry.dataValues,
    deletedAt,
    updatedAt,
  };
}

const deleteAndFindQuery = (model) => async (identifierObj) => {
  const findOne = findOneQuery(model);
  const update = updateQuery(model);

  const deletedAt = new Date().toISOString();
  const deleteEntry = await findOne(identifierObj);
  const updatedAt = await update(identifierObj, { deletedAt }, { isDeleting: true });

  return createDeleteEntry(deleteEntry, deletedAt, updatedAt);
};

const deleteQuery = (model) => async (identifierObj) => {
  const update = updateQuery(model);
  const deletedAt = new Date().toISOString();
  const entryDeleted = await update(identifierObj, { deletedAt }, { isDeleting: true });

  return entryDeleted;
};

module.exports = {
  deleteQuery,
  deleteAndFindQuery,
};
