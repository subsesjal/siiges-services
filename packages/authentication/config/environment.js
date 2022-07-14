// External dependencies
const dotenv = require('dotenv');
const { dotenvPath } = require('@siiges-services/shared');

dotenv.config({ path: dotenvPath });

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
};
