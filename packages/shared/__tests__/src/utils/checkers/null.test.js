// External dependencies
const { faker } = require('@faker-js/faker');
// Internal dependencies
const { fakeData } = require('../../../auxiliary-constants');
const { isNotNull, isNull } = require('../../../../src/utils/checkers');

const fakeDataWithoutNull = {
  ...fakeData,
};
delete fakeDataWithoutNull.NULL;
const randomValue = faker.helpers.objectValue(fakeDataWithoutNull);
const nullString = 'null';

describe('Given a call to isNull function', () => {
  describe("when it's pass a  var different to null", () => {
    test('then it should return false', () => {
      expect(isNull(randomValue)).toBe(false);
    });
  });

  describe("when it's pass a null var", () => {
    test('then it should return true', () => {
      expect(isNull(null)).toBe(true);
    });
  });

  describe('when the var is a string with "null"', () => {
    test('then it should return false', () => {
      expect(isNull(nullString)).toBe(true);
    });
  });
});

describe('Given a call to isNotNull function', () => {
  describe("when it's pass a  var different to null", () => {
    test('then it should return true', () => {
      expect(isNotNull(randomValue)).toBe(true);
    });
  });

  describe("when it's pass a null var", () => {
    test('then it should return false', () => {
      expect(isNotNull(null)).toBe(false);
    });
  });

  describe('when the var is string wiht the phrase "null"', () => {
    test('then it should return false', () => {
      expect(isNotNull(nullString)).toBe(false);
    });
  });
});
