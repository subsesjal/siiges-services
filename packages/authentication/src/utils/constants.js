// External dependencies
const { ExtractJwt } = require('passport-jwt');

// Internal dependencies
const { environmentVars } = require('../../config');

const jwtOptions = {
  secretOrKey: environmentVars.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = jwtOptions;
