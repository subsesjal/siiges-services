/* eslint-disable global-require */
// Internal dependencies
const {
  fakeData,
  nodeEnv,
} = require('../../../auxiliary-constants');

const { isTestEnvironment } = require('../../../../src/utils/checkers');

describe('Given a call to isTestEnvironment function', () => {
  describe("when it's pass a  var with string 'test'", () => {
    test('then it should return true', () => {
      expect(isTestEnvironment(nodeEnv.TEST)).toBe(true);
    });
  });

  describe("when it's pass a  number var", () => {
    test('then it should return false', () => {
      expect(isTestEnvironment(fakeData.number)).toBe(false);
    });
  });

  describe('when the string is different to production', () => {
    test('then it should return false', () => {
      expect(isTestEnvironment(fakeData.string)).toBe(false);
    });
  });

  describe('when the var is undefined', () => {
    test('then it should return false', () => {
      expect(isTestEnvironment(fakeData.UNDEFINED)).toBe(false);
    });
  });
});
