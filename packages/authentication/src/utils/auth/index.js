// External dependencies
const passport = require('passport');

// Internal dependencies
const { JwtStrategy } = require('./strategies');

passport.use(JwtStrategy);
