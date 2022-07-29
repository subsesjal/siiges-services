// Internal dependencies
const { nodeEnv } = require('../../../auxiliary-constants');

const dotenv = jest.requireMock('dotenv');
const setPath = jest.requireMock('../../../../src/adapters/dotenv/set-path');

const configPathModule = '../../../../src/adapters/dotenv';
const nodejsModule = '../../../../src/adapters/nodejs';
const checkersModule = '../../../../src/utils/checkers';

describe('Given a call to configPath function', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When node environment is set in development mode', () => {
    const { configPath } = jest.requireActual(configPathModule);
    const { getEnvironment } = jest.requireMock(nodejsModule);

    const filename = 'development.env';
    test('then getEnvironment and setPath should have benn called', () => {
      getEnvironment.mockReturnValue(nodeEnv.DEV);
      configPath();

      expect(getEnvironment).toHaveBeenCalled();
      expect(setPath).toHaveBeenCalledWith(filename);
      expect(dotenv.config).toHaveBeenCalled();
    });
  });

  describe('When node environment is set in production mode', () => {
    const { configPath } = jest.requireActual(configPathModule);
    const { getEnvironment } = jest.requireMock(nodejsModule);

    const filename = 'production.env';
    test('then getEnvironment and setPath should have benn called', () => {
      getEnvironment.mockReturnValue(nodeEnv.PROD);
      configPath();
      expect(getEnvironment).toHaveBeenCalled();
      expect(setPath).toHaveBeenCalledWith(filename);
      expect(dotenv.config).toHaveBeenCalled();
    });
  });

  describe('When node environment is neither development or production', () => {
    test('then configPath should throw TypeError', () => {
      jest.unmock(nodejsModule);
      const {
        isDevEnvironment,
        isProdEnvironment,
      } = jest.requireMock(checkersModule);
      isDevEnvironment.mockReturnValue(false);
      isProdEnvironment.mockReturnValue(false);

      const { configPath } = jest.requireActual(configPathModule);
      expect(configPath).toThrow(TypeError);
      expect(configPath).toThrow('Invalid assignment to const "NODE_ENV"');
    });
  });

  describe('When node environment is not set', () => {
    test('then configPath should throw Reference error', () => {
      jest.unmock(nodejsModule);
      const { isUndefined } = jest.requireMock(checkersModule);
      isUndefined.mockReturnValue(true);
      const { configPath } = jest.requireActual(configPathModule);
      expect(() => configPath()).toThrow(ReferenceError);
      expect(() => configPath()).toThrow('reference to undefined property "NODE_ENV"');
    });
  });
});
