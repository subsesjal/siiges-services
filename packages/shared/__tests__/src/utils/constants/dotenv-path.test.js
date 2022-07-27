/* eslint-disable global-require */
// Internal dependencies
const {
  devRegexPath,
  prodRegexPath,
} = require('../../../test-regex');

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
      // Creating mocks to test dotenvPath module
      process.env.NODE_ENV = 'development';
      const { isDevEnvironment } = require('../../../../src/utils/env-checkers');
      isDevEnvironment.mockReturnValue(true);
      const dotenvPath = require('../../../../src/utils/constants/dotenv-path');

      expect(dotenvPath).toMatch(devRegexPath);
    });
  });

  describe('When node is set in production mode', () => {
    test('Then dotenvPath should be production.env in root directory', () => {
      // Creating mocks to test dotenvPath module
      process.env.NODE_ENV = 'production';
      const { isProdEnvironment } = require('../../../../src/utils/env-checkers');
      isProdEnvironment.mockReturnValue(true);

      const dotenvPath = require('../../../../src/utils/constants/dotenv-path');
      expect(dotenvPath).toMatch(prodRegexPath);
    });
  });

  describe('When node is not set mode', () => {
    test('Then dotenvPath should throw and error', () => {
      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const dotenvPath = require('../../../../src/utils/constants/dotenv-path');
      }).toThrow(TypeError);

      expect(() => {
        // eslint-disable-next-line no-unused-vars
        const dotenvPath = require('../../../../src/utils/constants/dotenv-path');
      }).toThrow('Invalid assignment to const "dotenvPath"');
    });
  });
});
