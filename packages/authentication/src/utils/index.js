const validateUserPayload = require('./validate-user-payload');
const {
  jwtOptions,
  tokenExpirationTime,
} = require('./constants');

module.exports = {
  validateUserPayload,
  jwtOptions,
  tokenExpirationTime,
};
