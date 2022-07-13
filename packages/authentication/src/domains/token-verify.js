// External dependencies
const jwt = require('jsonwebtoken');
const { Logger } = require('@siiges-services/shared');

// Internal dependencies
const { environmentVars } = require('../../config/index');

const verifyToken = (token) => {
  try {
    jwt.verify(token, environmentVars.tokenPublicKey);
  } catch (error) {
    Logger.error(`Invalid token \nerror: ${error}`);
  }
};

module.exports = verifyToken;
