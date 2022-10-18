// External dependencies
const fsp = require('fs/promises');
// Internal dependencies
const { exist, notExist } = require('../../../../../src/adapters/fs/directories/exist.directories.fs.adapters');
const { pathNotExist } = require('../../../../../src/adapters/fs/path-exist.fs.adapters');

jest.mock('../../../../../src/adapters/fs/path-exist.fs.adapters', () => ({
  pathNotExist: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  stat: jest.fn(),
  mkdir: jest.fn(),
  unlink: jest.fn(),
}));

pathNotExist.mockReturnValue(false);

describe('Given a path', () => {
  describe("When it doesn't exist in the system", () => {
    test('THEN exist fucntion should return false', async () => {
      pathNotExist.mockReturnValueOnce(true);
      const returnValue = await exist();

      expect(returnValue).toBe(false);
    });

    test('THEN notExist fucntion should return true', async () => {
      pathNotExist.mockReturnValueOnce(true);
      const returnValue = await notExist();

      expect(returnValue).toBe(true);
    });
  });

  describe('When the path exist but is not a directory', () => {
    test('THEN exist function should return false', async () => {
      fsp.stat.mockReturnValueOnce({ isDirectory: () => false });
      const returnValue = await exist();

      expect(returnValue).toBe(false);
    });

    test('THEN notExist function should return true', async () => {
      fsp.stat.mockReturnValueOnce({ isDirectory: () => false });
      const returnValue = await notExist();

      expect(returnValue).toBe(true);
    });
  });

  describe('When the path exist and is a directory', () => {
    test('THEN exist function should return true', async () => {
      fsp.stat.mockReturnValueOnce({ isDirectory: () => true });
      const returnValue = await exist();

      expect(returnValue).toBe(true);
    });

    test('THEN notExist function should return false', async () => {
      fsp.stat.mockReturnValueOnce({ isDirectory: () => true });
      const returnValue = await notExist();

      expect(returnValue).toBe(false);
    });
  });
});
