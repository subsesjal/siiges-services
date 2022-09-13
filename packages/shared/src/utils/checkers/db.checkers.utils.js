const boom = require('@hapi/boom');
const { isNull } = require('./null');

function entryNotFounded(table, identifierObj) {
  throw boom.notFound(
    `[${table}:findOne]: can't find user with identifier: ${identifierObj}`,
  );
}

function ensureEntryWasFounded(entry, table, identifierObj) {
  if (isNull(entry)) entryNotFounded(table, identifierObj);
}

module.exports = {
  ensureEntryWasFounded,
};
