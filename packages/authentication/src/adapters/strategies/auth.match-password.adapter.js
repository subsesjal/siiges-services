// External dependencies
const { createHash, createHmac } = require('crypto');
// Internal dependencies
const { validate } = require('@siiges-services/shared');
const { crypto } = require('../../../config');

const encryptStringHashAlgorithm = (string) => {
  validate({
    nameVar: 'string',
    valueVar: string,
    expectedDatatype: 'string',
  });

  const hashMD5 = createHash(crypto.hashAlgorithm);
  return hashMD5.update(string).digest('hex');
};

const encrypStringHmacAlgorithm = (string) => {
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
};

const matchHmacPassword = (password, passwordSavedDB) => encrypStringHmacAlgorithm(password)
  === passwordSavedDB;

const matchHashPassword = (password, passwordSavedDB) => encryptStringHashAlgorithm(password)
  === passwordSavedDB;

module.exports = {
  matchHmacPassword,
  matchHashPassword,
  encrypStringHmacAlgorithm,
};
