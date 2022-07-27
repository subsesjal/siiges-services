// External dependencies
const { Strategy } = require('passport-jwt');

// Internal dependencies
const { jwtOptions } = require('../../constants');

const JwtStrategy = new Strategy(jwtOptions, (payload, done) => done(null, payload));

module.exports = JwtStrategy;
