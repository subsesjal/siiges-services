// External dependencies
const { faker } = require('@faker-js/faker');

const injectionVars = {
  string: faker.word.noun(),
  number: faker.random.numeric(),
  UNDEFINED: undefined,
  bool: faker.datatype.boolean(),
};

const nodeEnv = {
  DEV: 'development',
  PROD: 'production',
};

module.exports = {
  injectionVars,
  nodeEnv,
};
