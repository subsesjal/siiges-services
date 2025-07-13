// Internal dependencies
const { dotenv } = require('../src/adapters');

dotenv.configPath();

module.exports = {
  frontPassword: process.env.FRONT_PASSWORD,
  frontHashAlgorithm: process.env.FRONT_HASH_ALGORITHM,
  jwtSecret: process.env.JWT_SECRET,
};
