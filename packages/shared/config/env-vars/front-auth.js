// Internal dependencies
const { dotenv } = require('../../src/adapters');

dotenv.configPath();

module.exports = {
  frontPassword: process.env.PASSWORD,
  frontSalt: process.env.FRONT_SALT,
};
