// External dependencies
const { checkers } = require('@siiges-services/shared');
// Internal dependencies
const findOneQuery = require('./find-one.db.adapter');

const findAndUpdateQuery = (model) => async (identifierObj, changes) => {
  const tableName = model.getTableName();
  const findOne = findOneQuery(model);
  const actualEntry = await findOne({ ...identifierObj }, {});

  checkers.throwErrorIfDataIsFalsy(actualEntry, tableName, identifierObj);

  const updatedAt = new Date().toISOString();
  const entryChanges = { ...changes, updatedAt };
  const entryUpdated = await model.update(entryChanges);

  return entryUpdated;
};

const updateQuery = (model) => async (changes) => {
  const updatedAt = new Date().toISOString();
  const entryChanges = { ...changes, updatedAt };
  const entryUpdated = await model.update(entryChanges, {});

  return entryUpdated;
};

module.exports = {
  findAndUpdateQuery,
  updateQuery,
};
