/**
 * @description Export all features and business rules from the package
 */
const useCases = require('./use-cases/db/vigilancia');

module.exports = {
  ...useCases,
};
