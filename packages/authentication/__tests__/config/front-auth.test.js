// Internal depedencies
const { fakeData } = require('../auxiliary-constants');

const sharedModule = '@siiges-services/shared';
const frontAuthModule = '../../config/front-auth';

describe('Given a call to softwareEnvironments object', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe(`When FRONT_PASSWORD and
  FRONT_HASH_ALGORITHM is defined and is a string`, () => {
    const expectedObject = {
      hashAlgorithm: expect.any(String),
      password: expect.any(String),
    };
    test('Then it should have this structure', () => {
      const { dotenv } = jest.requireMock(sharedModule);
      dotenv.getEnvironmentVar.mockReturnValueOnce(fakeData.string);
      dotenv.getEnvironmentVar.mockReturnValueOnce(fakeData.string);

      const frontAuth = jest.requireActual(frontAuthModule);
      expect(frontAuth).toEqual(
        expect.objectContaining(expectedObject),
      );
    });
  });

  describe('When FRONT_PASSWORD is not defined', () => {
    test('then we should het a reference error', () => {
      expect(() => {
        jest.unmock(sharedModule);
        jest.requireActual(frontAuthModule);
      }).toThrow(ReferenceError);
    });
  });

  describe('When  FRONT_HASH_ALGORITHM is not defined', () => {
    test('then we should het a reference error', () => {
      const { checkers } = jest.requireMock(sharedModule);

      expect(() => {
        checkers.isUndefined.mockReturnValue(true);
        jest.unmock(sharedModule);
        jest.requireActual(frontAuthModule);
      }).toThrow(ReferenceError);
      expect(() => {
        checkers.isUndefined.mockReturnValue(true);
        jest.unmock(sharedModule);
        jest.requireActual(frontAuthModule);
      }).toThrow('reference to undefined property "FRONT_HASH_ALGORITHM"');
    });
  });
});
