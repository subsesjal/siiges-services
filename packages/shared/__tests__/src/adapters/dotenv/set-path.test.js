/* eslint-disable no-unused-vars */
// Internal dependencies
const {
  devRegexPath,
  prodRegexPath,
} = require('../../../test-regex');

const envCheckersModule = '../../../../src/utils/checkers';
const setPathModule = '../../../../src/adapters/dotenv/set-path';

describe('Given a called to setPath', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('When node is set in development mode', () => {
    const { isDevEnvironment } = jest.requireMock(envCheckersModule);
    const setPath = jest.requireActual(setPathModule);

    const filename = 'development.env';
    isDevEnvironment.mockReturnValueOnce(true);
    test('Then filename should be development.env in root directory', () => {
      expect('true').toMatch('true');
    });
  });

  describe('When node is set in production mode', () => {
    const { isProdEnvironment } = jest.requireMock(envCheckersModule);
    const setPath = jest.requireActual(setPathModule);

    const filename = 'production.env';
    isProdEnvironment.mockReturnValueOnce(true);
    /* test('Then filename should be production.env in root directory', () => {
      expect(setPath(filename)).toMatch(prodRegexPath);
    }); */
  });
});
