// Internal dependencies
const { injectionVars } = require('../../../auxiliary-constants');

const { isUndefined } = jest.requireActual('../../../../src/utils/checkers');

describe('Given a call to isUndefined function', () => {
  describe("when it's pass a  var with a string", () => {
    test('then it should return false', () => {
      expect(isUndefined(injectionVars.string)).toBe(false);
    });
  });

  describe("when it's pass a  var with number", () => {
    test('then it should return false', () => {
      expect(isUndefined(injectionVars.number)).toBe(false);
    });
  });

  describe('when the var is a boolean', () => {
    test('then it should return false', () => {
      expect(isUndefined(injectionVars.bool)).toBe(false);
    });
  });

  describe('when the var is undefined', () => {
    test('then it should return true', () => {
      expect(isUndefined(injectionVars.UNDEFINED)).toBe(true);
    });
  });
});
