// External dependencies
const { join } = require('path');
// Internal dependecies
const environmentVars = require('../../../config/environment');
const { softwareEnvironments } = require('./software-environment');

const isDevEnvironment = () => {
  if (environmentVars.NODE_ENV === softwareEnvironments.DEV) {
    return true;
  }
  return false;
};

const isProdEnvironment = () => {
  if (environmentVars.NODE_ENV === softwareEnvironments.PROD) {
    return true;
  }
  return false;
};

const setPath = (filename) => {
  if (isDevEnvironment || isProdEnvironment) {
    const localPath = join(__dirname, '../../..', filename);
    return localPath;
  }

  throw new Error('By the moment only development and production environment is available');
};

const filename = `${environmentVars.NODE_ENV}.env`;
const dotenvPath = setPath(filename);

module.exports = dotenvPath;
