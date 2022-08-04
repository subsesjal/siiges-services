// External dependencies
const { Strategy } = require('passport-jwt');

// Internal dependencies
const { jwtSecret } = require('../../../../config');

const JwtStrategy = new Strategy(jwtSecret, (payload, done) => done(null, payload));

module.exports = JwtStrategy;
