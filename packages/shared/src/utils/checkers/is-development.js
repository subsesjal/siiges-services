// Internal dependencies
const softwareEnvironments = require('../constants/software-environment');

function isDevEnvironment(environmentVar) {
  if (environmentVar === softwareEnvironments.DEV) {
    return true;
  }
  return false;
}

module.exports = isDevEnvironment;
