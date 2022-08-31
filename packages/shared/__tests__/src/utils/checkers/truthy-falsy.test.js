// External dependencies
const { faker } = require('@faker-js/faker');
// Internal dependencies
const {
  isFalsy,
  isTruthy,
} = require('../../../../src/utils/checkers');

const falsyValuesList = [
  false, 0, -0,
  0n, '', null,
  undefined, NaN,
];

const truthyValuesList = [
  faker.datatype.array,
  faker.datatype.datetime,
  faker.datatype.bigInt,
  faker.datatype.hexadecimal,
  faker.datatype.uuid,
];

const faslyValue = faker.helpers.arrayElement(falsyValuesList);
const truthyValue = faker.helpers.arrayElement(truthyValuesList);

describe('Given a call to isFalsy value', () => {
  describe('When the argument passed is falsy', () => {
    test('THEN it should return true', () => {
      expect(isFalsy(faslyValue)).toBe(true);
    });
  });

  describe('When the argument passed is truthy', () => {
    test('THEN it should return false', () => {
      expect(isFalsy(truthyValue)).toBe(false);
    });
  });
});

describe('Given a call to isTruthy value', () => {
  describe('When the argument passed is falsy', () => {
    test('THEN it should return false', () => {
      expect(isTruthy(faslyValue)).toBe(false);
    });
  });

  describe('When the argument passed is truthy', () => {
    test('THEN it should return true', () => {
      expect(isTruthy(truthyValue)).toBe(true);
    });
  });
});
