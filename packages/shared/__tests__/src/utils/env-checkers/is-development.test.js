/* eslint-disable global-require */
// Internal dependencies
const testNodeEnvs = require('../../../testNodeEnvs');

const orginalEnvVars = process.env;

afterAll(() => {
  process.env = orginalEnvVars;
});

describe('Given a call to isDeVEnvironment function', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('when node is set in development', () => {
    test('then it should return true', () => {
      process.env.NODE_ENV = testNodeEnvs.DEV;
      const { isDevEnvironment } = require('../../../../src/utils/env-checkers');
      expect(isDevEnvironment()).toBe(true);
    });
  });

  describe('when node is set in production', () => {
    test('then it should return false', () => {
      process.env.NODE_ENV = testNodeEnvs.PROD;
      const { isDevEnvironment } = require('../../../../src/utils/env-checkers');
      expect(isDevEnvironment()).toBe(false);
    });
  });

  describe('when node is neither production or development', () => {
    test('then it should return false', () => {
      process.env.NODE_ENV = testNodeEnvs.FAKE;
      const { isDevEnvironment } = require('../../../../src/utils/env-checkers');
      expect(isDevEnvironment()).toBe(false);
    });
  });

  describe('when node is not set', () => {
    test('then it should return false', () => {
      process.env.NODE_ENV = testNodeEnvs.UNDEFINED;
      const { isDevEnvironment } = require('../../../../src/utils/env-checkers');
      expect(isDevEnvironment()).toBe(false);
    });
  });
});
