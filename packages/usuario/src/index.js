/**
 * @description Export all features and business rules from the package
 */

// Services
const boom = require('@hapi/boom');
//const { getById } = require('./useCases');

// Domains
//const { getUsuarioQuery } = require('./domains');

// Services
const { getById } = require('./useCases');

const { getByIdQuery } = require('./domains');

module.exports = {
	getById: getById(getByIdQuery),
};
