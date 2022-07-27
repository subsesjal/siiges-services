// External dependencies
const { faker } = require('@faker-js/faker');
// Internal dependencies
const {
  devRegexPath,
  prodRegexPath,
} = require('../../../test-regex');
const setPath = require('../../../../src/utils/dotenv/set-path');
// mock modules
const envCheckers = require('../../../../src/utils/env-checkers');

describe('Given a called to setPath', () => {
  describe('When node is set in development mode', () => {
    test('Then filename should be development.env in root directory', () => {
      envCheckers.isDevEnvironment.mockReturnValueOnce(true);

      const filename = 'development.env';
      expect(setPath(filename)).toMatch(devRegexPath);
    });
  });

  describe('When node is set in production mode', () => {
    test('Then filename should be production.env in root directory', () => {
      envCheckers.isProdEnvironment.mockReturnValueOnce(true);

      const filename = 'production.env';
      expect(setPath(filename)).toMatch(prodRegexPath);
    });
  });

  describe(`When node is set in set in different than
  development or production`, () => {
    test('Then should throw ReferenceError', () => {
      envCheckers.isProdEnvironment.mockReturnValue(false);
      envCheckers.isDevEnvironment.mockReturnValue(false);

      const filename = faker.word.noun();
      expect(() => {
        setPath(filename);
      }).toThrow('Invalid assignment to const "dotenvPath"');
      expect(() => {
        setPath(filename);
      }).toThrow(TypeError);
    });
  });
});
