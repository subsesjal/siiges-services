const boom = require('@hapi/boom');
const { isFalsy } = require('./truthy-falsy');

function entryNotFounded(table, identifierObj) {
  throw boom.notFound(
    `[${table}]: can't ${table} with identifier: ${identifierObj}`,
  );
}

function throwErrorIfDataIsFalsy(entry, table, identifierObj) {
  if (isFalsy(entry)) entryNotFounded(table, identifierObj);
}

module.exports = {
  throwErrorIfDataIsFalsy,
};
