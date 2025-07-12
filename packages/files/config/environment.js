const { dotenv } = require('@siiges-services/shared');

const DEFAULT_PATH_FILE = '../../../../../../'; // Default fallback path for the configuration file

const config = {
  pathFile: dotenv.getEnvironmentVar('PATH_FILE') || DEFAULT_PATH_FILE,
};

module.exports = {
  config,
};
