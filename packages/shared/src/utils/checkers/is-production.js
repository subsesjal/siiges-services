// Internal dependencies
const softwareEnvironments = require('../constants/software-environment');

const isProdEnvironment = (environmentVar) => {
  if (environmentVar === softwareEnvironments.PROD) {
    return true;
  }
  return false;
};

module.exports = isProdEnvironment;
