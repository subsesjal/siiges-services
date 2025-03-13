const {
  encryptString,
  getUserEncryptAlgorithm,
  encrypStringHmacAlgorithm,
  encryptStringHashAlgorithm,
} = require('./crypto');

const strategies = require('./strategies');

module.exports = {
  encryptString,
  getUserEncryptAlgorithm,
  encrypStringHmacAlgorithm,
  encryptStringHashAlgorithm,
  ...strategies,
};
