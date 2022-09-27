// External dependencies
const { findOneQueryEntityType } = require('../../../adapters/db/entity-type.db.adapters');
// Internal dependencies
const findOneEntityType = require('./find-one.entity-type.db.use-cases');

module.exports = {
  findOneEntityType: findOneEntityType(findOneQueryEntityType),
};
