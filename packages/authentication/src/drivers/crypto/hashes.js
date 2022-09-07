// External dependencies
const { createHash } = require('crypto');
// Internal dependencies
const { crypto } = require('../../../config');

const hashMD5 = createHash(crypto.hashAlgorithm);

module.exports = hashMD5;
