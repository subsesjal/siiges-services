// External dependencies
const jwt = require('jsonwebtoken');

// Internal dependencies
const { environmentVars } = require('../../config/index');

const signToken = (informationObj, algorithm) => {
  const token = jwt.sign(
    informationObj,
    environmentVars.tokenPrivateKey,
    { algorithm },
  );

  return token;
};

module.exports = signToken;
