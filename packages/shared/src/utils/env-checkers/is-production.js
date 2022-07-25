// Internal dependencies
const softwareEnvironments = require('../constants/software-environment');
const { envVars } = require('../../../config');

const isProdEnvironment = () => {
  if (envVars.node.env === softwareEnvironments.PROD) {
    return true;
  }
  return false;
};

module.exports = isProdEnvironment;
