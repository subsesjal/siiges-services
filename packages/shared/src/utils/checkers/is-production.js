// Internal dependencies
const softwareEnvironments = require('../constants/software-environment');

function isProdEnvironment(environmentVar) {
  if (environmentVar === softwareEnvironments.PROD) {
    return true;
  }
  return false;
}

module.exports = isProdEnvironment;
