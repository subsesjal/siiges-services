// External dependencies
const dotenv = require('dotenv');
const { dotenvPath } = require('@siiges-services/shared');

dotenv.config({ path: dotenvPath });

module.exports = {
  tokenPrivateKey: process.env.TOKEN_PRIVATE_KEY,
  tokenPublicKey: process.env.TOKEN_PUBLIC_KEY,
};
