jest.mock('@siiges-services/shared', () => ({
  __esmodule: true,
  checkers: {
    isString: jest.fn(),
    isUndefined: jest.fn(),
  },
  dotenv: {
    getEnvironmentVar: jest.fn(),
  },
}));

jest.mock('dotenv', () => ({
  __esmodule: true,
  config: jest.fn(),
}));
