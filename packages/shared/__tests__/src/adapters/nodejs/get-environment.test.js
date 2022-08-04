// Internal dependencies
const { nodeEnv } = require('../../../auxiliary-constants');

const originalEnvs = process.env;
const envCheckersModule = '../../../../src/utils/checkers';
const getEnvironmentModules = '../../../../src/adapters/nodejs';

describe('given call to getEnvironment function', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    process.env = {
      ...originalEnvs,
    };
  });

  describe('when NODE_ENV is set with production envionment', () => {
    test('then we should get production string', () => {
      process.env.NODE_ENV = nodeEnv.PROD;

      const { isProdEnvironment } = jest.requireMock(envCheckersModule);
      const { getEnvironment } = jest.requireActual(getEnvironmentModules);

      isProdEnvironment.mockReturnValueOnce(true);
      const returnValue = getEnvironment();

      expect(returnValue).toBe(nodeEnv.PROD);
    });
  });

  describe('when node is set with development environment', () => {
    test('then we should get "development" string', () => {
      process.env.NODE_ENV = nodeEnv.DEV;

      const { isDevEnvironment } = jest.requireMock(envCheckersModule);
      const { getEnvironment } = jest.requireActual(getEnvironmentModules);

      isDevEnvironment.mockReturnValueOnce(true);
      const returnValue = getEnvironment();
      expect(returnValue).toBe(nodeEnv.DEV);
    });
  });

  describe(`when node is set neither development nor
  production environment`, () => {
    process.env.NODE_ENV = nodeEnv.FAKE;
    test('then we should get a type error with message', () => {
      const { getEnvironment } = jest.requireActual(getEnvironmentModules);
      expect(getEnvironment).toThrow(TypeError);
      expect(getEnvironment).toThrow('Invalid assignment to const "NODE_ENV"');
    });
  });

  describe('whe node envirionment is not set', () => {
    test('then we should get a Reference error message', () => {
      const { isUndefined } = jest.requireMock(envCheckersModule);

      delete process.env.NODE_ENV;
      isUndefined.mockReturnValue(true);
      const { getEnvironment } = jest.requireActual(getEnvironmentModules);
      expect(getEnvironment).toThrow(ReferenceError);
      expect(getEnvironment).toThrow('reference to undefined property "NODE_ENV"');
    });
  });
});
