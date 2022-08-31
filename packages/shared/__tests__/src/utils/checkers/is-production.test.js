/* eslint-disable global-require */
// Internal dependencies
const {
  fakeData,
  nodeEnv,
} = require('../../../auxiliary-constants');

const { isProdEnvironment } = require('../../../../src/utils/checkers');

describe('Given a call to isProdEnvironment function', () => {
  describe("when it's pass a  var with string 'production'", () => {
    test('then it should return false', () => {
      expect(isProdEnvironment(nodeEnv.PROD)).toBe(true);
    });
  });

  describe("when it's pass a  number var", () => {
    test('then it should return false', () => {
      expect(isProdEnvironment(fakeData.number)).toBe(false);
    });
  });

  describe('when the string is different to production', () => {
    test('then it should return false', () => {
      expect(isProdEnvironment(fakeData.string)).toBe(false);
    });
  });

  describe('when the var is undefined', () => {
    test('then it should return false', () => {
      expect(isProdEnvironment(fakeData.UNDEFINED)).toBe(false);
    });
  });
});
