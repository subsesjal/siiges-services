const { fakeData } = require('../../../auxiliary-constants');

const getEnvironmentVarModule = '../../../../src/adapters/environment-vars/get-environment-var';
const checkersModule = '../../../../src/utils/checkers';
const originalEnv = process.env;

describe(`Given a call to getEnvironmentVar function with
a valid key name as an argument value`, () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    process.env = {
      ...originalEnv,
    };
  });

  describe('When environment variable is set', () => {
    process.env = {
      ...originalEnv,
      [fakeData.techWord]: fakeData.string,
    };

    const getEnvironmentVar = jest.requireActual(getEnvironmentVarModule);
    const { isUndefined } = jest.requireMock(checkersModule);
    test('then we should get environment var value', () => {
      isUndefined.mockReturnValueOnce(false);
      const returnValue = getEnvironmentVar(fakeData.techWord);

      expect(returnValue).toBe(fakeData.string);
    });
  });

  describe('When environment var is not set', () => {
    test('then we should get an Reference error', () => {
      const getEnvironmentVar = jest.requireActual(getEnvironmentVarModule);

      const { isUndefined } = jest.requireMock(checkersModule);
      isUndefined.mockReturnValue(true);
      expect(() => getEnvironmentVar(fakeData.techWord)).toThrow(ReferenceError);
      expect(() => getEnvironmentVar(fakeData.techWord))
        .toThrow(`reference to undefined property "${fakeData.techWord}"`);
    });
  });
});
