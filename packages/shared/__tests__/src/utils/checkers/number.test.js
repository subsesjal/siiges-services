// External dependencies
const { faker } = require('@faker-js/faker');
// Internal dependencies
const { fakeData } = require('../../../auxiliary-constants');
const { isNumber, isNotNumber } = require('../../../../src/utils/checkers');

const fakeDataWithoutNumber = {
  ...fakeData,
};
delete fakeDataWithoutNumber.number;
const randomValue = faker.helpers.objectValue(fakeDataWithoutNumber);

describe('Given a call to isNumber function', () => {
  describe('when the var pass is not a number ', () => {
    test('then it should return false', () => {
      expect(isNumber(randomValue)).toBe(false);
    });
  });

  describe('when the var pass is a number', () => {
    test('then it should return true', () => {
      expect(isNumber(fakeData.number)).toBe(true);
    });
  });
});

describe('Given a call to isNotNumber function', () => {
  describe('when the var pass is not a number ', () => {
    test('then it should return true', () => {
      expect(isNotNumber(randomValue)).toBe(true);
    });
  });

  describe('when the var pass is a number', () => {
    test('then it should return false', () => {
      expect(isNotNumber(fakeData.number)).toBe(false);
    });
  });
});
