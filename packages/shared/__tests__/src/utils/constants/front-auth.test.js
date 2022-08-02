// Internal depedencies
const { fakeData } = require('../../../auxiliary-constants');

const environmentVarModule = '../../../../src/adapters/environment-vars';
const frontAuthModule = '../../../../src/utils/constants/front-auth';
const checkersModule = '../../../../src/utils/checkers';

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
      process.env.FRONT_HASH_ALGORITHM = fakeData.string;
      process.env.FRONT_PASSWORD = fakeData.string;
      const frontAuth = jest.requireActual(frontAuthModule);
      expect(frontAuth).toEqual(
        expect.objectContaining(expectedObject),
      );
    });
  });

  describe('When FRONT_PASSWORD is not defined', () => {
    test('then we should het a reference error', () => {
      delete process.env.FRONT_PASSWORD;
      process.env.FRONT_HASH_ALGORITHM = fakeData.string;
      jest.unmock(environmentVarModule);
      const { isUndefined } = jest.requireMock(checkersModule);
      expect(() => {
        isUndefined.mockReturnValueOnce(true);
        jest.requireActual(frontAuthModule);
      }).toThrow(ReferenceError);
      expect(() => {
        isUndefined.mockReturnValueOnce(false);
        isUndefined.mockReturnValueOnce(true);
        jest.requireActual(frontAuthModule);
      }).toThrow('reference to undefined property "FRONT_PASSWORD"');
    });
  });

  describe('When  FRONT_HASH_ALGORITHM is not defined', () => {
    test('then we should het a reference error', () => {
      delete process.env.FRONT_HASH_ALGORITHM;
      process.env.FRONT_PASSWORD = fakeData.string;
      jest.unmock(environmentVarModule);
      const { isUndefined } = jest.requireMock(checkersModule);
      isUndefined.mockReturnValue(true);

      expect(() => {
        jest.requireActual(frontAuthModule);
      }).toThrow(ReferenceError);
      expect(() => {
        jest.requireActual(frontAuthModule);
      }).toThrow('reference to undefined property "FRONT_HASH_ALGORITHM"');
    });
  });
});
