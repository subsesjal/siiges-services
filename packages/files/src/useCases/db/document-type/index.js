// Extrernal dependencies
const { findOneQueryDocumentType } = require('../../../adapters/db/document-type.db.adapters');
// Internal dependencies
const findOneDocumentType = require('./find-one.document-type.db.use-cases');

module.exports = {
  findOneDocumentType: findOneDocumentType(findOneQueryDocumentType),
};
