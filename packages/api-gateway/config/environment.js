const { constants } = require('@siiges-services/shared');
require('dotenv').config({ path: constants.dotenvPath });

const whiteListStr = process.env.WHITE_LIST;
const whiteList = whiteListStr.split(',');

module.exports = {
  serverHost: process.env.SERVER_HOST,
  serverPort: process.env.SERVER_PORT,
  whiteList,
};
