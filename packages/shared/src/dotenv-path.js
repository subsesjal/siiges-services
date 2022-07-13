// External dependencies
const { join } = require('path');
// Internal dependecies
const environmentVars = require('../config/environment');
const { environments } = require('./utils/constants');

const envIsDevelopment = () => {
  if (environmentVars.NODE_ENV === environments.DEV) {
    return true;
  }
  return false;
};

const setPath = (filename) => {
  if (envIsDevelopment) {
    const localPath = join(__dirname, '../../..', filename);
    return localPath;
  }

  throw new Error('By the moment only development environment is available');
};

const filename = `${environmentVars.NODE_ENV}.env`;
const dotenvPath = setPath(filename);

module.exports = dotenvPath;
