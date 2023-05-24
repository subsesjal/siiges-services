// External dependencies
const { validate } = require('@siiges-services/shared');
const { createHmac, createHash } = require('crypto');

// Internal dependencies
const { crypto } = require('../../../config');

function encryptString(string, passwordUpdated) {
  validate({
    nameVar: 'string',
    valueVar: string,
    expectedDatatype: 'string',
  });
  validate({
    nameVar: 'userObject.passwordUpdated',
    valueVar: passwordUpdated,
    expectedDatatype: 'boolean',
  });

  if (passwordUpdated) {
    const hmac = createHmac(
      crypto.hmacAlgorithm,
      crypto.hmacSalt,
    );
    return hmac.update(string).digest('hex');
  }

  const hashMD5 = createHash(crypto.hashAlgorithm);
  return hashMD5.update(string).digest('hex');
}

module.exports = encryptString;
