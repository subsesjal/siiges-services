const { dotenv } = require('@siiges-services/shared');

module.exports = {
  password: dotenv.getEnvironmentVar(
    'AUTH_FRONT_PASSWORD',
  ),
};
