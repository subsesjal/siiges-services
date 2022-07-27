// Internal dependencies
const softwareEnvironments = require('../constants/software-environment');
const { envVars } = require('../../../config');

const isDevEnvironment = () => {
  if (envVars.node.env === softwareEnvironments.DEV) {
    return true;
  }
  return false;
};

module.exports = isDevEnvironment;
