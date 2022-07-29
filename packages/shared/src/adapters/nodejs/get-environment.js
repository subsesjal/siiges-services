// Internal dependencies
const { env } = require('../../../config/env-vars/nodejs');
const {
  isUndefined,
  isProdEnvironment,
  isDevEnvironment,
} = require('../../utils/checkers');

const getEnvironment = () => {
  if (isUndefined(env)) {
    throw ReferenceError('reference to undefined property "NODE_ENV"');
  } else if (!isProdEnvironment(env) && !isDevEnvironment(env)) {
    throw new TypeError('Invalid assignment to const "NODE_ENV"');
  }

  return env;
};

module.exports = getEnvironment;
