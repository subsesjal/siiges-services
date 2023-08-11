// Internal dependencies
const softwareEnvironments = require('../constants/software-environment');

function isCiEnvironment(environmentVar) {
  if (environmentVar === softwareEnvironments.CI) {
    return true;
  }
  return false;
}

module.exports = isCiEnvironment;
