// External dependencies
const { validate } = require('@siiges-services/shared');
// Internal dependencies
const { hashMD5, hmac } = require('../../drivers/crypto');

function getUserEncryptAlgorithm(passwordUpdated) {
  validate({
    nameVar: 'userObject.passwordUpdated',
    valueVar: passwordUpdated,
    expectedDatatype: 'boolean',
  });
  if (passwordUpdated) {
    return hmac;
  }
  return hashMD5;
}

module.exports = getUserEncryptAlgorithm;
