const { dotenv } = require('@siiges-services/shared');

module.exports = {
  hashAlgorithm: dotenv.getEnvironmentVar('FRONT_HASH_ALGORITHM'),
  password: dotenv.getEnvironmentVar('FRONT_PASSWORD'),
};
