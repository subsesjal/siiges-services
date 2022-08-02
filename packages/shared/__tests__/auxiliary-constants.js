// External dependencies
const { faker } = require('@faker-js/faker');

const environmentVarsDeclared = [
  { jwtSecret: 'JWT_SECRET' },
  { frontPassword: 'FRONT_PASSWORD' },
  { frontHashAlgorithm: 'FRONT_HASH_ALGORITHM' },
];

const fakeData = {
  string: faker.word.noun(),
  number: faker.datatype.number(),
  UNDEFINED: undefined,
  bool: faker.datatype.boolean(),
};

const nodeEnv = {
  DEV: 'development',
  PROD: 'production',
  FAKE: faker.word.noun(),
  UNDEFINED: undefined,
};

module.exports = {
  fakeData,
  nodeEnv,
  environmentVarsDeclared,
};
