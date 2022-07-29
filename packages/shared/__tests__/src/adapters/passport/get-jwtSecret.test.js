// Internal dependencies
const { injectionVars } = require('../../../auxiliary-constants');

const getJwtSecretModule = '../../../../src/adapters/passport';
const checkersModule = '../../../../src/utils/checkers';

describe('Given a call to getJwtSecret', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('when jwtSecret is a string', () => {
    process.env.JWT_SECRET = injectionVars.string;
    const { getJwtSecret } = jest.requireActual(getJwtSecretModule);
    const { isString } = jest.requireMock(checkersModule);

    test('then should return jwtSecret value', () => {
      isString.mockReturnValue(true);
      const returnValue = getJwtSecret();
      expect(returnValue).toBe(injectionVars.string);
    });
  });

  describe('when jwtSecret is a number', () => {
    process.env.JWT_SECRET = injectionVars.number;
    const { getJwtSecret } = jest.requireActual(getJwtSecretModule);
    const { isString } = jest.requireMock(checkersModule);

    test('then should mark type error', () => {
      isString.mockReturnValue(false);
      expect(getJwtSecret).toThrow(TypeError);
      expect(getJwtSecret).toThrow('"jwtSecret" is not a string');
    });
  });

  describe('when jwtSecret is not defined', () => {
    process.env.JWT_SECRET = injectionVars.string;
    const { getJwtSecret } = jest.requireActual(getJwtSecretModule);
    const { isUndefined } = jest.requireMock(checkersModule);

    test('then should mark reference error', () => {
      isUndefined.mockReturnValue(true);
      expect(getJwtSecret).toThrow(ReferenceError);
      expect(getJwtSecret)
        .toThrow('reference to undefined property "jwtSecret"');
    });
  });
});
