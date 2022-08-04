// External dependencies
const jwt = require('jsonwebtoken');

// Internal dependencies
const { jwtSecret } = require('../../config');

const signToken = (informationObj, algorithm) => {
  const token = jwt.sign(
    informationObj,
    jwtSecret,
    { algorithm },
  );

  return token;
};

module.exports = signToken;
