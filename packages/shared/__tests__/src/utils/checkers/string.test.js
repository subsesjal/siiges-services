// External dependencies
const { faker } = require('@faker-js/faker');
// Internal dependencies
const { fakeData } = require('../../../auxiliary-constants');
const { isString, isNotString } = require('../../../../src/utils/checkers');

const fakeDataWithoutString = {
  ...fakeData,
};
delete fakeDataWithoutString.string;
const randomValue = faker.helpers.objectValue(fakeDataWithoutString);

describe('Given a call to isString function', () => {
  describe('when the var pass is not a string ', () => {
    test('then it should return false', () => {
      expect(isString(randomValue)).toBe(false);
    });
  });

  describe('when the var pass is a string', () => {
    test('then it should return true', () => {
      expect(isString(fakeData.string)).toBe(true);
    });
  });
});

describe('Given a call to isNotString function', () => {
  describe('when the var pass is not a string ', () => {
    test('then it should return true', () => {
      expect(isNotString(randomValue)).toBe(true);
    });
  });

  describe('when the var pass is a string', () => {
    test('then it should return false', () => {
      expect(isNotString(fakeData.string)).toBe(false);
    });
  });
});
