// Extrernal dependencies
const { queries } = require('@siiges-services/core');
// Internal dependencies
const findOneDocumentType = require('./find-one.document-type.db.use-cases');

module.exports = {
  findOneDocumentType: findOneDocumentType(queries.findOneQuery),
};
