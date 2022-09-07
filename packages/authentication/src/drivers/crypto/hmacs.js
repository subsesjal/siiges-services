// External dependencies
const { createHmac } = require('crypto');
const { crypto } = require('../../../config');

const hmac = createHmac(
  crypto.hmacAlgorithm,
  crypto.hmacSalt,
);

module.exports = hmac;
