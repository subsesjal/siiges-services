// Internal dependencies
const {
  fakeData,
  nodeEnv,
} = require('../../../auxiliary-constants');

const { isDevEnvironment } = require('../../../../src/utils/checkers');

describe('Given a call to isDeVEnvironment function', () => {
  describe("when it's pass a  var with string 'development'", () => {
    test('then it should return true', () => {
      expect(isDevEnvironment(nodeEnv.DEV)).toBe(true);
    });
  });

  describe("when it's pass a  number var", () => {
    test('then it should return false', () => {
      expect(isDevEnvironment(fakeData.number)).toBe(false);
    });
  });

  describe('when the var has a stirng different to development', () => {
    test('then it should return false', () => {
      expect(isDevEnvironment(fakeData.string)).toBe(false);
    });
  });

  describe('when the var is undefined', () => {
    test('then it should return false', () => {
      expect(isDevEnvironment(fakeData.UNDEFINED)).toBe(false);
    });
  });
});
