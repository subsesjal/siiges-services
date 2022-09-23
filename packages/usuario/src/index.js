/**
 * @description Export all features and business rules from the package
 */

// Services
const userQueries = require('./useCases');

module.exports = { ...userQueries };
