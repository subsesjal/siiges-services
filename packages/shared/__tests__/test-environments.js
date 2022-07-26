// External dependencies
const { faker } = require('@faker-js/faker');

const testNodeEnvs = {
  DEV: 'development',
  PROD: 'production',
  FAKE: faker.word.noun(),
  UNDEFINED: undefined,
};

module.exports = testNodeEnvs;
