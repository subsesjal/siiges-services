// Internal dependencies
const { configPath } = require('../dotenv');
const { isUndefined } = require('../../utils/checkers');

configPath();

function getEnvironmentVar(keyName) {
  const environmentVar = process.env[keyName];
  if (isUndefined(environmentVar)) {
    throw ReferenceError(`reference to undefined property "${keyName}"`);
  }

  return environmentVar;
}

module.exports = getEnvironmentVar;
