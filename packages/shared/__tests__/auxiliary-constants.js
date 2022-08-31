// External dependencies
const { faker } = require('@faker-js/faker');

const fakeData = {
  string: faker.datatype.string(),
  number: faker.datatype.number(),
  UNDEFINED: undefined,
  bool: faker.datatype.boolean(),
  NULL: null,
};

const nodeEnv = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'test',
  FAKE: faker.word.noun(),
  UNDEFINED: undefined,
};

const techWord = faker.hacker.ingverb();

module.exports = {
  fakeData,
  nodeEnv,
  techWord,
};
