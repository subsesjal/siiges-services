// Internal dependencies
const softwareEnvironments = require('../constants/software-environment');

const isDevEnvironment = (environmentVar) => {
  if (environmentVar === softwareEnvironments.DEV) {
    return true;
  }
  return false;
};

module.exports = isDevEnvironment;
