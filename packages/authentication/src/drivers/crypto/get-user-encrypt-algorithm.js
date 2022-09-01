// External dependencies
const { validate } = require('@siiges-services/shared');
// Internal dependencies
const hashMD5 = require('./hashes');
const hmac = require('./hmacs');

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
