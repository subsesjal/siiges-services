/* eslint-disable global-require */
// Internal dependencies
const testNodeEnvs = require('../../../test-environments');

const orginalEnvVars = process.env;

afterAll(() => {
  process.env = orginalEnvVars;
});

describe('Given a call to isDeVEnvironment function', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('when node is set in development', () => {
    // setting a fake node env value
    process.env.NODE_ENV = testNodeEnvs.DEV;
    const { isDevEnvironment } = jest.requireActual('../../../../src/utils/env-checkers');

    test('then it should return true', () => {
      expect(isDevEnvironment()).toBe(true);
    });
  });

  describe('when node is set in production', () => {
    test('then it should return false', () => {
      // setting a fake node env value
      process.env.NODE_ENV = testNodeEnvs.PROD;
      const { isDevEnvironment } = jest.requireActual('../../../../src/utils/env-checkers');

      expect(isDevEnvironment()).toBe(false);
    });
  });

  describe('when node is neither production or development', () => {
    test('then it should return false', () => {
      // setting a fake node env value
      process.env.NODE_ENV = testNodeEnvs.FAKE;
      const { isDevEnvironment } = jest.requireActual('../../../../src/utils/env-checkers');

      expect(isDevEnvironment()).toBe(false);
    });
  });

  describe('when node is not set', () => {
    test('then it should return false', () => {
      // setting a fake node env value
      process.env.NODE_ENV = testNodeEnvs.UNDEFINED;
      const { isDevEnvironment } = jest.requireActual('../../../../src/utils/env-checkers');

      expect(isDevEnvironment()).toBe(false);
    });
  });
});
