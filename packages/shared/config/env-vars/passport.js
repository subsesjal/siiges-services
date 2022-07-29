// Internal dependencies
const { dotenv } = require('../../src/adapters');

dotenv.configPath();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
};
