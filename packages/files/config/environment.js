const { dotenv } = require('@siiges-services/shared');

const config = {
  pathFile: dotenv.getEnvironmentVar('PATH_FILE') || '../../../../../../',
};

module.exports = {
  config,
};
