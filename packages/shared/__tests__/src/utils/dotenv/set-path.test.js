/* eslint-disable global-require */
// External dependencies
const { faker } = require('@faker-js/faker');
// Internal dependencies
const {
  devRegexPath,
  prodRegexPath,
} = require('../../../test-regex');

const setPathModule = '../../../../src/utils/dotenv/set-path';
const envCheckersModule = '../../../../src/utils/env-checkers';

describe('Given a called to setPath', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('When node is set in development mode', () => {
    test('Then filename should be development.env in root directory', () => {
      const { isDevEnvironment } = jest.requireMock(envCheckersModule);
      isDevEnvironment.mockReturnValueOnce(true);
      const setPath = jest.requireActual(setPathModule);

      const filename = 'development.env';
      expect(setPath(filename)).toMatch(devRegexPath);
    });
  });

  describe('When node is set in production mode', () => {
    test('Then filename should be production.env in root directory', () => {
      const { isProdEnvironment } = jest.requireMock(envCheckersModule);
      isProdEnvironment.mockReturnValueOnce(true);
      const setPath = jest.requireActual(setPathModule);

      const filename = 'production.env';
      expect(setPath(filename)).toMatch(prodRegexPath);
    });
  });

  describe('When node is not set', () => {
    test('Then should throw ReferenceError', () => {
      const {
        isUndefined,
      } = jest.requireMock(envCheckersModule);

      isUndefined.mockReturnValue(true);
      const setPath = jest.requireActual(setPathModule);

      const filename = faker.word.noun();
      expect(() => {
        setPath(filename);
      }).toThrow('reference to undefined property "NODE_ENV"');
      expect(() => {
        setPath(filename);
      }).toThrow(ReferenceError);
    });
  });

  describe(`When node is set in set in different than
  development or production`, () => {
    test('Then should throw ReferenceError', () => {
      const {
        isProdEnvironment,
        isDevEnvironment,
        isUndefined,
      } = jest.requireMock(envCheckersModule);

      isProdEnvironment.mockReturnValue(false);
      isDevEnvironment.mockReturnValue(false);
      isUndefined.mockReturnValue(false);
      const setPath = jest.requireActual(setPathModule);

      const filename = faker.word.noun();
      expect(() => {
        setPath(filename);
      }).toThrow('Invalid assignment to const "NODE_ENV"');
      expect(() => {
        setPath(filename);
      }).toThrow(TypeError);
    });
  });
});
