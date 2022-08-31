// Internal dependencies
const { nodeEnv } = require('../../../config/nodejs');
const {
  isUndefined,
  isProdEnvironment,
  isDevEnvironment,
  isTestEnvironment,
} = require('../../utils/checkers');

function getEnvironment() {
  if (isUndefined(nodeEnv)) {
    throw ReferenceError('reference to undefined property "NODE_ENV"');
  } else if (!isProdEnvironment(nodeEnv)
  && !isDevEnvironment(nodeEnv)
  && !isTestEnvironment(nodeEnv)) {
    throw new TypeError('Invalid assignment to const "NODE_ENV"');
  }

  return nodeEnv;
}

module.exports = getEnvironment;
