// External dependencies
const jwt = require('jsonwebtoken');

// Internal dependencies
const { jwtParams } = require('../../../config');

function signToken(payloadObject) {
  const token = jwt.sign(
    payloadObject,
    jwtParams.secret,
    { algorithm: jwtParams.algorithm },
  );

  return token;
}

module.exports = {
  signToken,
};
