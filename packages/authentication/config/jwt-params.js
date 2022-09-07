// External dependencies
const { dotenv } = require('@siiges-services/shared');

module.exports = {
  secret: dotenv.getEnvironmentVar(
    'AUTH_JWT_SECRET',
  ),
  algorithm: dotenv.getEnvironmentVar(
    'AUTH_JWT_ALGORITHM',
  ),
};
