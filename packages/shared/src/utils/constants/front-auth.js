const getEnvironmentVar = require('../../adapters/environment-vars/get-environment-var');

module.exports = {
  hashAlgorithm: getEnvironmentVar('FRONT_HASH_ALGORITHM'),
  password: getEnvironmentVar('FRONT_PASSWORD'),
};
