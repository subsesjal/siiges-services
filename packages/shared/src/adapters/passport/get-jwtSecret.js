// Internal dependencies
const { passport } = require('../../../config/env-vars');
const {
  isUndefined,
  isString,
} = require('../../utils/checkers');

const getJwtSecret = () => {
  if (isUndefined(passport.jwtSecret)) {
    throw ReferenceError('reference to undefined property "jwtSecret"');
  } else if (!isString(passport.jwtSecret)) {
    throw new TypeError('"jwtSecret" is not a string');
  }

  return passport.jwtSecret;
};

module.exports = getJwtSecret;
