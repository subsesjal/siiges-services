const { dotenv } = require('@siiges-services/shared');

const config = {
  serviceEmail: dotenv.getEnvironmentVar('SERVICE_EMAIL'),
  userEmail: dotenv.getEnvironmentVar('USER_EMAIL'),
  passwordEmail: dotenv.getEnvironmentVar('PASSWORD_EMAIL'),
  BaseUrlFront: dotenv.getEnvironmentVar('BASE_URL_FRONT'),
};

module.exports = {
  config,
};
