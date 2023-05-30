// Internal dependencies
const { jwtParams } = require('../../config');

const jwtOptions = {
  jwtSecret: jwtParams.secret,
};

const tokenExpirationTime = {
  machine: Math.floor(Date.now / 1000) + (60 * 60 * 24),
  user: Math.floor(Date.now / 1000) + (60 * 60),
};

module.exports = {
  jwtOptions,
  tokenExpirationTime,
};
