// External dependencies
const { ExtractJwt } = require('passport-jwt');
// Internal dependencies
const getEnvironmentVar = require('../../adapters/environment-vars/get-environment-var');

module.exports = {
  jwtSecret: getEnvironmentVar('JWT_SECRET'),
  jwtFromRequestFunction: ExtractJwt.fromAuthHeaderAsBearerToken,
};
