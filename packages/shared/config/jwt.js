const { ExtractJwt } = require('passport-jwt');

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
