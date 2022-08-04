// Internal dependencies
const { fakeData } = require('../../../auxiliary-constants');

const { isUndefined } = jest.requireActual('../../../../src/utils/checkers');

describe('Given a call to isUndefined function', () => {
  describe("when it's pass a  var with a string", () => {
    test('then it should return false', () => {
      expect(isUndefined(fakeData.string)).toBe(false);
    });
  });

  describe("when it's pass a  var with number", () => {
    test('then it should return false', () => {
      expect(isUndefined(fakeData.number)).toBe(false);
    });
  });

  describe('when the var is a boolean', () => {
    test('then it should return false', () => {
      expect(isUndefined(fakeData.bool)).toBe(false);
    });
  });

  describe('when the var is undefined', () => {
    test('then it should return true', () => {
      expect(isUndefined(fakeData.UNDEFINED)).toBe(true);
    });
  });
});
