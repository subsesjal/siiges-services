const { dotenv } = require('@siiges-services/shared');

module.exports = {
  hmacAlgorithm: dotenv.getEnvironmentVar(
    'AUTH_HMAC_ALGORITHM',
  ),
  hmacSalt: dotenv.getEnvironmentVar(
    'AUTH_HMAC_SALT',
  ),
  hashAlgorithm: dotenv.getEnvironmentVar(
    'AUTH_HASH_ALGORITHM',
  ),
};
