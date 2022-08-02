const { faker } = require('@faker-js/faker');
const { environmentVarsDeclared, fakeData } = require('../../../auxiliary-constants');

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
  const tmpObject = faker.helpers.arrayElement(environmentVarsDeclared);
  const randomKeyName = Object.keys(tmpObject);
  const randomEnvironmentVar = Object.values(tmpObject);

  describe('When environment variable is set', () => {
    process.env = {
      ...originalEnv,
      [randomEnvironmentVar]: fakeData.string,
    };

    const getEnvironmentVar = jest.requireActual(getEnvironmentVarModule);
    const { isUndefined } = jest.requireMock(checkersModule);
    test('then we should get environment var value', () => {
      isUndefined.mockReturnValueOnce(false);
      const returnValue = getEnvironmentVar(randomKeyName);

      expect(returnValue).toBe(fakeData.string);
    });
  });

  describe('When environment var is not set', () => {
    test('then we should get an Reference error', () => {
      const getEnvironmentVar = jest.requireActual(getEnvironmentVarModule);

      const { isUndefined } = jest.requireMock(checkersModule);
      isUndefined.mockReturnValue(true);
      expect(() => getEnvironmentVar(randomKeyName)).toThrow(ReferenceError);
      expect(() => getEnvironmentVar(randomKeyName))
        .toThrow(`reference to undefined property "${randomKeyName}"`);
    });
  });
});
