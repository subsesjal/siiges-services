// External dependencies
const fs = require('fs');
const { faker } = require('@faker-js/faker');
// Internal dependencies
const { pathNotExist } = require('../../../../../src/adapters/fs/path-exist.fs.adapters');
const { createIfNotExist } = require('../../../../../src/adapters/fs/files');

jest.mock('../../../../../src/adapters/fs/path-exist.fs.adapters', () => ({
  pathNotExist: jest.fn(),
}));

const createReadStream = jest.spyOn(fs, 'createReadStream');
const createWriteStream = jest.spyOn(fs, 'createWriteStream');
const createReadStreamReturnValue = {
  pipe: jest.fn(),
  on: jest.fn(),
};

const exist = false;
const notExist = true;
const file = {
  path: faker.system.filePath(),
};
const fileName = faker.system.fileName();
const filePath = faker.system.filePath();

pathNotExist.mockReturnValue(exist);

describe('Given a file object, file name and a file path', () => {
  test('Then pathNotExist should have been called', () => {
    createIfNotExist();
    expect(pathNotExist).toHaveBeenCalled();
  });

  describe("When the file path doesnt't exist", () => {
    test('THEN it should not call createWriteStream', () => {
      createIfNotExist();
      expect(createWriteStream).not.toHaveBeenCalled();
    });

    test('THEN it should not call createReadStream', () => {
      createIfNotExist();
      expect(createReadStream).not.toHaveBeenCalled();
    });
  });

  describe('when the file path exists', () => {
    test('THEN it should call createWriteStream', () => {
      pathNotExist.mockReturnValueOnce(notExist);
      createWriteStream.mockImplementationOnce(() => jest.fn());
      createReadStream.mockImplementationOnce(() => createReadStreamReturnValue);

      createIfNotExist(file, fileName, filePath);
      expect(createWriteStream).toHaveBeenCalled();
    });

    test('THEN it should call createReadStream', () => {
      pathNotExist.mockReturnValueOnce(notExist);
      createWriteStream.mockImplementationOnce(() => jest.fn());
      createReadStream.mockImplementationOnce(() => createReadStreamReturnValue);

      createIfNotExist(file, fileName, filePath);
      expect(createReadStream).toHaveBeenCalled();
    });
  });
});
