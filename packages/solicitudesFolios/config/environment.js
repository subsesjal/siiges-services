const { dotenv } = require('@siiges-services/shared');

const config = {
  apiBaseUrl: dotenv.getEnvironmentVar('API_BASE_URL'),
};

module.exports = {
  config,
};
