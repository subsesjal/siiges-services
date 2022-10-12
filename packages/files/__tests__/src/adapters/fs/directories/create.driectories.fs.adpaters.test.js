// External dependencies
const fsp = require('fs/promises');
// Internal dependencies
const { notExist } = require('../../../../../src/adapters/fs/directories/exist.directories.fs.adapters');
const { createIfNotExist } = require('../../../../../src/adapters/fs/directories/create.driectories.fs.adpaters');

jest.mock('../../../../../src/adapters/fs/directories/exist.directories.fs.adapters', () => ({
  notExist: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  mkdir: jest.fn(),
}));

describe('Given a call to createDirIfNotExist', () => {
  test('THEN it should call fsp.stat function', async () => {
    await createIfNotExist();
    expect(notExist).toHaveBeenCalled();
  });

  describe('When the directory not exist', () => {
    test('THEN it shuld call fsp.mkdir function', async () => {
      notExist.mockReturnValue(true);
      await createIfNotExist();
      expect(fsp.mkdir).toHaveBeenCalled();
    });
  });
});
