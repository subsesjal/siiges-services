// External dependencies
const { faker } = require('@faker-js/faker');
const { checkers } = require('@siiges-services/shared');
const fsp = require('fs/promises');
const fs = require('fs');
// Internal dependencies
const writeBus = require('../../../../src/useCases/fs/write-bus.use-cases.fs');
const { file } = require('../../../query-response');
const { pathNotExist } = require('../../../../src/adapters/fs/path-exist.fs.adapters');
const { notExist } = require('../../../../src/adapters/fs/directories/exist.directories.fs.adapters');
const directory = require('../../../../src/adapters/fs/directories');
const fileModule = require('../../../../src/adapters/fs/files');

jest.mock('../../../../src/adapters/fs/path-exist.fs.adapters', () => ({
  pathNotExist: jest.fn(),
}));
jest.mock('../../../../src/adapters/fs/directories/exist.directories.fs.adapters', () => ({
  notExist: jest.fn(),
}));

pathNotExist.mockReturnValue(false);
notExist.mockReturnValue(false);

const fileName = file.nombre;
const dirFilePath = file.ubicacion;

jest.spyOn(directory, 'createPath').mockImplementation(() => dirFilePath);
jest.spyOn(directory, 'createIfNotExist');

jest.spyOn(fileModule, 'createName').mockImplementation(() => fileName);
jest.spyOn(fileModule, 'unlinkIfNameIsDefined');
jest.spyOn(fileModule, 'createIfNotExist');
jest.spyOn(fileModule, 'createPath').mockImplementation(() => `${dirFilePath}/undefined`);

const currentFile = faker.datatype.json();
const tipoDocumento = faker.system.commonFileType();
const tipoEntidad = faker.commerce.department();
const filePath = `${dirFilePath}/${fileName}`;
const createReadStreamReturnValue = {
  pipe: jest.fn(),
  on: jest.fn(),
};

describe('Given a tipoDocumento and tipoEntidad', () => {
  test('THEN it should call createPath with tipoDocumento and tipoEntidad like params', () => {
    writeBus(currentFile, { tipoDocumento, tipoEntidad })
      .then(() => expect(directory.createPath).toHaveBeenCalledWith(tipoEntidad, tipoDocumento));
  });

  test('THEN it should call createName with currentFile and tipoDocumento params', () => {
    writeBus(currentFile, { tipoDocumento, tipoEntidad })
      .then(() => expect(fileModule.createName).toHaveBeenCalledWith(tipoDocumento, currentFile));
  });

  test('THEN it shoul call directory.createIfNotExist', () => {
    writeBus(currentFile, { tipoDocumento, tipoEntidad })
      .then(() => expect(directory.createIfNotExist).toHaveBeenCalledWith(dirFilePath));
  });

  test('THEN it should call unlikIfNameIsDefined', () => {
    const fileToUnlikPath = `${dirFilePath}/undefined`;
    writeBus(currentFile, { tipoDocumento, tipoEntidad })
      .then(() => expect(
        fileModule.unlinkIfNameIsDefined,
      ).toHaveBeenCalledWith(undefined, fileToUnlikPath));
  });

  test('THEN it should call file.createIfNotExist', () => {
    writeBus(currentFile, { tipoDocumento, tipoEntidad })
      .then(() => expect(
        fileModule.createIfNotExist,
      ).toHaveBeenCalledWith(currentFile, fileName, filePath));
  });

  test('THEN it should return fileName', () => {
    writeBus(currentFile, { tipoDocumento, tipoEntidad })
      .then((returnValue) => expect(returnValue).toBe(fileName));
  });

  describe("When the directory doesn't exist", () => {
    test('THEN it should create it', () => {
      notExist.mockReturnValueOnce(true);
      writeBus(currentFile, { tipoDocumento, tipoEntidad })
        .then(() => expect(fsp.mkdir).toHaveBeenCalled());
    });
  });

  describe('When nombre propety is defined in file', () => {
    test('THEN it should unlink the file', () => {
      checkers.isDefined.mockReturnValueOnce(true);
      writeBus(currentFile, { tipoDocumento, tipoEntidad })
        .then(() => expect(fsp.unlink).toHaveBeenCalled());
    });
  });

  describe("When the file doesn't exist", () => {
    test('THEN it should call it', () => {
      pathNotExist.mockReturnValueOnce(true);
      jest.spyOn(fs, 'createReadStream').mockImplementationOnce(() => createReadStreamReturnValue);
      jest.spyOn(fs, 'createWriteStream').mockImplementationOnce(jest.fn());

      writeBus(currentFile, { tipoDocumento, tipoEntidad })
        .then(() => expect(fs.createReadStream).toHaveBeenCalled());
    });

    test('THEN it should call it', () => {
      pathNotExist.mockReturnValueOnce(true);
      jest.spyOn(fs, 'createReadStream').mockImplementationOnce(() => createReadStreamReturnValue);
      jest.spyOn(fs, 'createWriteStream').mockImplementationOnce(jest.fn());

      writeBus(currentFile, { tipoDocumento, tipoEntidad })
        .then(() => expect(fs.createWriteStream).toHaveBeenCalled());
    });
  });
});
