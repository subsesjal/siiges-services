// External dependencies
const { faker } = require('@faker-js/faker');

const injectionVars = {
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
  injectionVars,
  nodeEnv,
};
