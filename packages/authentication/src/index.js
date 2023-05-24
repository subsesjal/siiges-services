/**
 * @description Export all features and business rules from the package
 */
const useCases = require('./use-cases/crypto');

module.exports = {
  ...useCases,
};
