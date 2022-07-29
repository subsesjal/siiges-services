jest.mock('../src/utils/checkers', () => ({
  __esmodule: true,
  isDevEnvironment: jest.fn(),
  isProdEnvironment: jest.fn(),
  isUndefined: jest.fn(),
  isString: jest.fn(),
}));

jest.mock('../src/adapters/nodejs', () => ({
  __esmodule: true,
  getEnvironment: jest.fn(),
}));

jest.mock('../src/adapters/passport', () => ({
  __esmodule: true,
  getJwtSecret: jest.fn(),
}));

jest.mock('../src/adapters/dotenv/set-path', () => (
  jest.fn()
));

jest.mock('dotenv', () => ({
  __esmodule: true,
  config: jest.fn(),
}));
