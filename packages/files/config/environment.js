const { join } = require('path');

const DEFAULT_PATH_FILE = join('../../../'); // Default fallback path for the configuration file

const config = {
  pathFile: process.env.PATH_FILE,
};

module.exports = {
  config,
};
