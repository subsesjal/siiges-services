// External dependencies
const { ExtractJwt } = require('passport-jwt');
// Internal dependencies
const { jwtParams } = require('../../config');

const jwtOptions = {
  jwtSecret: jwtParams.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
};

const tokenExpirationTime = {
  machine: Math.floor(Date.now / 1000) + (60 * 60 * 24),
  user: Math.floor(Date.now / 1000) + (60 * 60),
};

module.exports = {
  jwtOptions,
  tokenExpirationTime,
};
