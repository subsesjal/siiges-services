// Internal dependencies
const { join } = require('path');
const { dotenv } = require('../src/adapters');

dotenv.configPath();

const pathDefault = join(__dirname, '../../../');

module.exports = {
  frontPassword: process.env.FRONT_PASSWORD,
  frontHashAlgorithm: process.env.FRONT_HASH_ALGORITHM,
  jwtSecret: process.env.JWT_SECRET,
  pathFile: process.env.PATH_FILE.startsWith('../') ? pathDefault : process.env.PATH_FILE,
};
