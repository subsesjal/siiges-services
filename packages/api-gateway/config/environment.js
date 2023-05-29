const { dotenv } = require('@siiges-services/shared');

const whiteListStr = dotenv.getEnvironmentVar('WHITE_LIST');
const whiteList = whiteListStr.split(',');

const config = {
  serverHost: dotenv.getEnvironmentVar('SERVER_HOST'),
  serverPort: dotenv.getEnvironmentVar('SERVER_PORT'),
  apiKey: dotenv.getEnvironmentVar('API_KEY'),
  authJwtSecret: dotenv.getEnvironmentVar('AUTH_JWT_SECRET'),
  whiteList,
};

module.exports = {
  config,
};
