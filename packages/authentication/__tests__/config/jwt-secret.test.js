// Internal depedencies
const { fakeData } = require('../auxiliary-constants');

const passportOptionsModule = '../../config/jwt-secret';
const sharedModule = '@siiges-services/shared';
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
    test('Then it should have this structure', () => {
      const { dotenv } = jest.requireMock(sharedModule);
      dotenv.getEnvironmentVar.mockReturnValue(fakeData.string);

      const jwt = jest.requireActual(passportOptionsModule);
      expect(jwt).toBe(fakeData.string);
    });
  });

  describe('When jwtSecret is not defined', () => {
    delete process.env.JWT_SECRET;
    test('then we should het a reference error', () => {
      const { checkers } = jest.requireMock(sharedModule);
      checkers.isUndefined.mockReturnValue(true);
      jest.unmock(sharedModule);

      expect(() => {
        jest.requireActual(passportOptionsModule);
      }).toThrow(ReferenceError);
      expect(() => {
        jest.requireActual(passportOptionsModule);
      }).toThrow('reference to undefined property "JWT_SECRET"');
    });
  });
});
