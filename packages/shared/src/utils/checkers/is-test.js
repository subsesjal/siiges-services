// Internal dependencies
const softwareEnvironments = require('../constants/software-environment');

function isTestEnvironment(environmentVar) {
  if (environmentVar === softwareEnvironments.TEST) {
    return true;
  }
  return false;
}

module.exports = isTestEnvironment;
