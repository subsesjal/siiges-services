// External dependencies
const dotenv = require('dotenv');
// Internal dependencies
const configPath = require('../../../../src/adapters/dotenv/config-path');
const { nodeEnv } = require('../../../auxiliary-constants');
const { getEnvironment } = require('../../../../src/adapters/nodejs');
const setPath = require('../../../../src/adapters/dotenv/set-path');

jest.mock('../../../../src/adapters/dotenv/set-path', () => jest.fn());
jest.mock('../../../../src/adapters/nodejs', () => ({
  getEnvironment: jest.fn(),
}));
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('Given a call to configPath function', () => {
  describe('When node environment is set in development mode', () => {
    const filename = 'development.env';
    test('THEN setPath should have been called', () => {
      getEnvironment.mockReturnValue(nodeEnv.DEV);

      configPath();
      expect(setPath).toHaveBeenCalledWith(filename);
    });

    test('Then dotenv.config should have been called', () => {
      getEnvironment.mockReturnValue(nodeEnv.DEV);

      configPath();
      expect(dotenv.config).toHaveBeenCalled();
    });
  });

  describe('When node environment is set in production mode', () => {
    const filename = 'production.env';
    test('THEN getEnvironment should have been called', () => {
      configPath();

      expect(getEnvironment).toHaveBeenCalled();
    });

    test('THEN setPath should have been called', () => {
      getEnvironment.mockReturnValue(nodeEnv.PROD);
      configPath();

      expect(setPath).toHaveBeenCalledWith(filename);
    });

    test('THEN dotenv.config should have been called', () => {
      getEnvironment.mockReturnValue(nodeEnv.PROD);
      configPath();
      expect(dotenv.config).toHaveBeenCalled();
    });
  });
});
