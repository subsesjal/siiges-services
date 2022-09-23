// External dependencies
const { queries } = require('@siiges-services/core');
// Internal dependencies
const findOneEntityType = require('./find-one.entity-type.db.use-cases');

module.exports = {
  findOneEntityType: findOneEntityType(queries.findOneQuery),
};
