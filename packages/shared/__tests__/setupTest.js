jest.mock('../src/adapters/dotenv/set-path', () => (
  jest.fn()
));

jest.mock('dotenv', () => ({
  __esmodule: true,
  config: jest.fn(),
}));
