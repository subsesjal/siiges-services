/**
 * @description Export all features and business rules from the package
 */

// Domains
const {
  findOneByParamsQuery,
  createQuery,
  updateQuery,
  deleteQuery,
} = require('./domains');

// Services
const {
  uploadFile,
  findOneByParams,
  deleteByParams,
} = require('./useCases');

module.exports = {
  uploadFile: uploadFile(createQuery, updateQuery, findOneByParamsQuery),
  findOneFile: findOneByParams(findOneByParamsQuery),
  deleteFile: deleteByParams(deleteQuery, findOneByParamsQuery),
};
