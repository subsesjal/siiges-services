// External dependencies
const { ExtractJwt } = require('passport-jwt');
// Internal dependencies
const { getJwtSecret } = require('../../adapters/passport');

module.exports = {
  jwtSecret: getJwtSecret(),
  jwtFromRequestFunction: ExtractJwt.fromAuthHeaderAsBearerToken,
};
