// External depencies
const { faker } = require('@faker-js/faker');

// Internal dependencies
const isThisDatatype = require('../../../../src/utils/checkers/is-this-datatype');
const { fakeData } = require('../../../auxiliary-constants');

describe('GIVEN a call to isThisDatatype function', () => {
  describe('WHEN variable argument is the datype expected', () => {
    const randomVar = faker.helpers.objectValue(fakeData);
    const datatypeRandomVar = typeof randomVar;
    test('THEN it should return true', () => {
      expect(isThisDatatype(randomVar, datatypeRandomVar)).toBe(true);
    });
  });

  describe('WHEN variable argument is not the datype expected', () => {
    test('THEN it should return false', () => {
      expect(isThisDatatype('hello', 'number')).toBe(false);
    });
  });
});
