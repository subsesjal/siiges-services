// External dependencies
const { validate } = require('@siiges-services/shared');
const { createHash } = require('crypto');
// Internal dependencies
const { crypto } = require('../../../config');

function encryptStringHashAlgorithm(string) {
  validate({
    nameVar: 'string',
    valueVar: string,
    expectedDatatype: 'string',
  });

  const hashMD5 = createHash(crypto.hashAlgorithm);
  return hashMD5.update(string).digest('hex');
}

module.exports = encryptStringHashAlgorithm;
