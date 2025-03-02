/**
 * @description Export all features and business rules from the package
 */

// Services
const useCases = require('./useCases');
const config = require('../config/environment');

module.exports = { ...useCases, ...config };
