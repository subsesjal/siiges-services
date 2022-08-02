// Internal depedencies
const { fakeData } = require('../../../auxiliary-constants');

const getEnvironmentVarModule = '../../../../src/adapters/environment-vars';
const passportOptionsModule = '../../../../src/utils/constants/passport-options';
const checkersModule = '../../../../src/utils/checkers';
const originalEnv = process.env;

describe('Given a call to softwareEnvironments object', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  afterEach(() => {
    process.env = {
      ...originalEnv,
    };
  });
  describe('When jwtSecret is defined and is a string', () => {
    const expectedObject = {
      jwtSecret: expect.any(String),
      jwtFromRequestFunction: expect.any(Function),
    };
    process.env.JWT_SECRET = fakeData.string;
    test('Then it should have this structure', () => {
      const jwt = jest.requireActual(passportOptionsModule);

      expect(jwt).toEqual(
        expect.objectContaining(expectedObject),
      );
    });
  });

  describe('When jwtSecret is not defined', () => {
    test('then we should het a reference error', () => {
      jest.unmock(getEnvironmentVarModule);
      const { isUndefined } = jest.requireMock(checkersModule);
      isUndefined.mockReturnValue(true);

      expect(() => {
        jest.requireActual(passportOptionsModule);
      }).toThrow(ReferenceError);
      expect(() => {
        jest.requireActual(passportOptionsModule);
      }).toThrow('reference to undefined property "JWT_SECRET"');
    });
  });
});
