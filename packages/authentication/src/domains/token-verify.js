// External dependencies
const jwt = require('jsonwebtoken');
const { Logger } = require('@siiges-services/shared');

// Internal dependencies
const { jwtSecret } = require('../../config');

const verifyToken = (token) => {
  try {
    jwt.verify(token, jwtSecret);
  } catch (error) {
    Logger.error(`Invalid token \nerror: ${error}`);
  }
};

module.exports = verifyToken;
