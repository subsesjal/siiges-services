// Internal dependencies
const { nodeEnv } = require('../../../auxiliary-constants');
const {
  devRegexPath,
  prodRegexPath,
} = require('../../../test-regex');

const envCheckersModule = '../../../../src/utils/env-checkers';
const dotenvPathModule = '../../../../src/utils/constants/dotenv-path';
const orginalEnvVars = process.env;

afterAll(() => {
  process.env = orginalEnvVars;
});

describe('Given a programmer retrieving dotenvPath constant', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('When node is set in development mode', () => {
    test('Then dotenvPath should be development.env in root directory', () => {
      const { isDevEnvironment } = jest.requireMock(envCheckersModule);
      isDevEnvironment.mockReturnValue(true);

      process.env.NODE_ENV = nodeEnv.DEV;
      const dotenvPath = jest.requireActual(dotenvPathModule);
      expect(dotenvPath).toMatch(devRegexPath);
    });
  });

  describe('When node is set in production mode', () => {
    test('Then dotenvPath should be production.env in root directory', () => {
      const { isProdEnvironment } = jest.requireMock(envCheckersModule);
      isProdEnvironment.mockReturnValue(true);

      process.env.NODE_ENV = nodeEnv.PROD;
      const dotenvPath = jest.requireActual(dotenvPathModule);
      expect(dotenvPath).toMatch(prodRegexPath);
    });
  });

  describe('When node env is not set', () => {
    test('Then dotenvPath should throw and error', () => {
      expect(() => {
        const {
          isUndefined,
        } = jest.requireMock(envCheckersModule);
        isUndefined.mockReturnValue(true);

        // eslint-disable-next-line no-unused-vars
        const dotenvPath = jest.requireActual(dotenvPathModule);
      }).toThrow(ReferenceError);

      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const dotenvPath = jest.requireActual(dotenvPathModule);
      }).toThrow('reference to undefined property "NODE_ENV"');
    });
  });

  describe(`When node is set mode different
  to development or production`, () => {
    test('Then dotenvPath should throw and error', () => {
      const {
        isProdEnvironment,
        isDevEnvironment,
        isUndefined,
      } = jest.requireMock(envCheckersModule);

      isUndefined.mockReturnValue(false);
      isDevEnvironment.mockReturnValue(false);
      isProdEnvironment.mockReturnValue(false);

      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const dotenvPath = jest.requireActual(dotenvPathModule);
      }).toThrow(TypeError);

      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const dotenvPath = jest.requireActual(dotenvPathModule);
      }).toThrow('Invalid assignment to const "NODE_ENV"');
    });
  });
});
