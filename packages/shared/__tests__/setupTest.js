jest.mock('../src/utils/env-checkers', () => ({
  __esmodule: true,
  isDevEnvironment: jest.fn(),
  isProdEnvironment: jest.fn(),
  isUndefined: jest.fn(),
}));
