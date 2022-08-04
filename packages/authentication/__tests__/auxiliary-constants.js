// External dependencies
const { faker } = require('@faker-js/faker');

const fakeData = {
  string: faker.datatype.string(),
  number: faker.datatype.number(),
  UNDEFINED: undefined,
  bool: faker.datatype.boolean(),
  techWord: faker.hacker.ingverb(),
};

module.exports = {
  fakeData,
};
