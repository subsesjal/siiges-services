const { dotenv } = require('@siiges-services/shared');

const whiteListStr = dotenv.getEnvironmentVar('WHITE_LIST');
const whiteList = whiteListStr.split(',');

module.exports = {
  serverHost: dotenv.getEnvironmentVar('SERVER_HOST'),
  serverPort: dotenv.getEnvironmentVar('SERVER_PORT'),
  whiteList,
};
