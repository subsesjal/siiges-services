/* eslint-disable global-require */
// Internal dependencies
const testNodeEnvs = require('../../testNodeEnvs');

describe('given a programmer who need to know node environment', () => {
  beforeAll(() => {
    jest.resetModules();
  });

  describe('when NODE_ENV is defined', () => {
    process.env.NODE_ENV = testNodeEnvs.FAKE;
    const node = require('../../../config/env-vars/node');
    test('then node.env should be a string', () => {
      expect(typeof node.env).toBe('string');
    });
    test('then node.env shoould have a string', () => {
      expect(node.env).toBe(testNodeEnvs.FAKE);
    });
  });
});
