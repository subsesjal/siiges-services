/* eslint-disable global-require */
// Internal dependencies
const {
  injectionVars,
  nodeEnv,
} = require('../../../auxiliary-constants');

const { isProdEnvironment } = jest.requireActual('../../../../src/utils/checkers');

describe('Given a call to isProdEnvironment function', () => {
  describe("when it's pass a  var with string 'production'", () => {
    test('then it should return false', () => {
      expect(isProdEnvironment(nodeEnv.PROD)).toBe(true);
    });
  });

  describe("when it's pass a  number var", () => {
    test('then it should return true', () => {
      expect(isProdEnvironment(injectionVars.number)).toBe(false);
    });
  });

  describe('when the string is different to production', () => {
    test('then it should return false', () => {
      expect(isProdEnvironment(injectionVars.string)).toBe(false);
    });
  });

  describe('when the var is undefined', () => {
    test('then it should return false', () => {
      expect(isProdEnvironment(injectionVars.UNDEFINED)).toBe(false);
    });
  });
});
