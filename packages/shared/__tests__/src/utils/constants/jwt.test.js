// Internal depedencies
const { injectionVars } = require('../../../auxiliary-constants');

const passport = '../../../../src/adapters/passport';
const jwtModule = '../../../../src/utils/constants/jwt';
const checkersModule = '../../../../src/utils/checkers';

describe('Given a call to softwareEnvironments object', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When jwtSecret is defined and is a string', () => {
    const expectedObject = {
      jwtSecret: expect.any(String),
      jwtFromRequestFunction: expect.any(Function),
    };
    test('Then it should have this structure', () => {
      const { getJwtSecret } = jest.requireMock(passport);
      getJwtSecret.mockReturnValue(injectionVars.string);

      const jwt = jest.requireActual(jwtModule);
      expect(jwt).toEqual(
        expect.objectContaining(expectedObject),
      );
    });
  });

  describe('when jwtSecret is not a string', () => {
    test('then we should get a type error', () => {
      jest.unmock(passport);
      const { isString, isUndefined } = jest.requireMock(checkersModule);
      isUndefined.mockReturnValue(false);
      isString.mockReturnValue(false);

      expect(() => {
        jest.requireActual(jwtModule);
      }).toThrow(TypeError);
      expect(() => {
        jest.requireActual(jwtModule);
      }).toThrow('"jwtSecret" is not a string');
    });
  });

  describe('When jwtSecret is not defined', () => {
    test('then we should het a reference error', () => {
      jest.unmock(passport);
      const { isUndefined } = jest.requireMock(checkersModule);
      isUndefined.mockReturnValue(true);

      expect(() => {
        jest.requireActual(jwtModule);
      }).toThrow(ReferenceError);
      expect(() => {
        jest.requireActual(jwtModule);
      }).toThrow('reference to undefined property "jwtSecret"');
    });
  });
});
