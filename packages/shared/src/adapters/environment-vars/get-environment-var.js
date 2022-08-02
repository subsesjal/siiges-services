// Internal dependencies
const { environmentVarsObject } = require('../../../config');
const { isUndefined } = require('../../utils/checkers');

function getEnvironmentVar(keyName) {
  const environmentVar = environmentVarsObject[keyName];
  if (isUndefined(environmentVar)) {
    throw ReferenceError(`reference to undefined property "${keyName}"`);
  }

  return environmentVar;
}

module.exports = getEnvironmentVar;
