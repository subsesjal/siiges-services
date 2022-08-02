/* eslint-disable global-require */
// Internal dependencies
const {
  fakeData,
} = require('../../../auxiliary-constants');

const { isString } = jest.requireActual('../../../../src/utils/checkers');

describe('Given a call to isString function', () => {
  describe('when the var pass is a number var', () => {
    test('then it should return false', () => {
      expect(isString(fakeData.number)).toBe(false);
    });
  });

  describe('when the var pass ia string', () => {
    test('then it should return false', () => {
      expect(isString(fakeData.string)).toBe(true);
    });
  });

  describe('when the var is pass is a boolean', () => {
    test('then it should return false', () => {
      expect(isString(fakeData.bool)).toBe(false);
    });
  });

  describe('when the var pass is a undefined', () => {
    test('then it should return false', () => {
      expect(isString(fakeData.UNDEFINED)).toBe(false);
    });
  });
});
