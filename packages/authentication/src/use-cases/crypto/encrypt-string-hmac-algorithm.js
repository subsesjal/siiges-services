// External dependencies
const { validate } = require('@siiges-services/shared');
const { createHmac } = require('crypto');
// Internal dependencies
const { crypto } = require('../../../config');

function encrypStringHmacAlgorithm(string) {
  validate({
    nameVar: 'string',
    valueVar: string,
    expectedDatatype: 'string',
  });

  const hmac = createHmac(
    crypto.hmacAlgorithm,
    crypto.hmacSalt,
  );
  return hmac.update(string).digest('hex');
}

module.exports = encrypStringHmacAlgorithm;
