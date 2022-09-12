// External dependencies
const boom = require('@hapi/boom');
// Internal dependencies
const findOneQuery = require('./find-one.db.adapter');

const updateQuery = (model) => async (identifierObj, changes, include) => {
  const tableName = model.getTableName();
  const findOne = findOneQuery(model);
  const actualEntry = await findOne({ ...identifierObj }, { include });

  if (!actualEntry) {
    throw boom.notFound(
      `[${tableName}:finOne]: We couldn't find any entry with identifier ${identifierObj} in \
${tableName} table`,
    );
  }

  const updatedAt = new Date().toISOString();
  const entryChanges = { ...changes, updatedAt };
  const entryUpdated = await model.update(entryChanges);

  return entryUpdated;
};

module.exports = updateQuery;
