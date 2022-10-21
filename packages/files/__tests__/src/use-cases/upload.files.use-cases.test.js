// External dependencies
const boom = require('@hapi/boom');
const { checkers } = require('@siiges-services/shared');
const { faker } = require('@faker-js/faker');
// Internal dependencies
const uploadFile = require('../../../src/useCases/upload.files.use-cases');
const { findOneDocumentType } = require('../../../src/useCases/db/document-type');
const { findOneEntityType } = require('../../../src/useCases/db/entity-type');
const fsModule = require('../../../src/useCases/fs');

const directory = require('../../../src/adapters/fs/directories');
const fileModule = require('../../../src/adapters/fs/files');
const db = require('../../../src/useCases/db');
const { fileData, uploadFileData } = require('../../constants');
const {
  documentType,
  entityType,
  identifierObj,
  file,
} = require('../../query-response');

jest.mock('../../../src/useCases/db/document-type', () => ({
  findOneDocumentType: jest.fn(),
}));

jest.mock('../../../src/useCases/db/entity-type', () => ({
  findOneEntityType: jest.fn(),
}));

const fileName = file.nombre;
const dirFilePath = file.ubicacion;

jest.spyOn(directory, 'createPath').mockImplementation(() => dirFilePath);
jest.spyOn(directory, 'createIfNotExist');

jest.spyOn(fileModule, 'createName').mockImplementation(() => fileName);
jest.spyOn(fileModule, 'unlinkIfNameIsDefined');
jest.spyOn(fileModule, 'createIfNotExist');

const throwErrorIfDataIsFalsy = jest.spyOn(checkers, 'throwErrorIfDataIsFalsy');
const createFile = jest.spyOn(db, 'createFile');
const findOneFile = jest.spyOn(db, 'findOneFile');
const getFileIdentifierObj = jest.spyOn(db, 'getFileIdentifierObj');
const updateFile = jest.spyOn(db, 'updateFile');
const writeBus = jest.spyOn(fsModule, 'writeBus');

const fileUploaded = faker.datatype.string();
const notFoundResponse = null;
const previousFileNotFound = null;
const previousFile = file;
const tipoDocumentoCheck = [documentType, 'tipoDocumento', fileData.tipoDocumento];
const tipoEntidadCheck = [entityType, 'tipoEntidad', fileData.tipoEntidad];

writeBus.mockImplementation(jest.fn());
updateFile.mockImplementation(jest.fn());
createFile.mockImplementation(jest.fn());

describe('Given a fileData', () => {
  describe("When the object doen't have tipoEntidad, entidadId and tipoDocumentoId properties", () => {
    test('Then it should call getFileIdentifierObj', () => {
      uploadFile(fileData).catch(
        () => expect(db.getFileIdentifierObj).toHaveBeenCalledWith(fileData),
      );
    });

    test('THEN it should throw a error', () => {
      uploadFile({}).catch((error) => expect(error).toBe(Error));
    });
  });

  describe(`When this object have tipoEntidad, entidadId and tipoDocumentoId propeties,
but there isn't a tipoEntidad with tipoEntidadId`, () => {
    test('Then it should call getFileIdentifierObj', () => {
      getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
      uploadFile(fileData).then(
        () => expect(db.getFileIdentifierObj).toHaveBeenCalledWith(fileData),
      );
    });

    test('THEN it should call checkers.throwErrorIfDataIsFalsy function', () => {
      findOneEntityType.mockReturnValueOnce(entityType);
      findOneDocumentType.mockReturnValueOnce(documentType);
      throwErrorIfDataIsFalsy.mockImplementationOnce(jest.fn()).mockImplementationOnce(jest.fn());

      uploadFile(fileData).catch(
        () => expect(
          checkers.throwErrorIfDataIsFalsy,
        ).toHaveBeenNthCalledWith(3, ...tipoDocumentoCheck),
      );
    });
    test('THEN it should call checkers.throwErrorIfDataIsFalsy function', () => {
      findOneEntityType.mockReturnValueOnce(entityType);
      findOneDocumentType.mockReturnValueOnce(documentType);
      throwErrorIfDataIsFalsy.mockImplementationOnce(jest.fn()).mockImplementationOnce(jest.fn());

      uploadFile(fileData).then(
        () => expect(
          checkers.throwErrorIfDataIsFalsy,
        ).toHaveBeenNthCalledWith(3, ...tipoDocumentoCheck),
      );
    });

    test('THEN it should call boom.notFound function', () => {
      findOneEntityType.mockReturnValueOnce(notFoundResponse);
      findOneDocumentType.mockReturnValueOnce(documentType);

      uploadFile(fileData).catch(() => expect(boom.notFound).toHaveBeenCalled());
    });

    test('THEN it should throw an error', () => {
      findOneEntityType.mockReturnValueOnce(notFoundResponse);
      findOneDocumentType.mockReturnValueOnce(documentType);

      uploadFile(fileData).catch((error) => expect(error).toBe(Error));
    });
  });

  describe(`When this object have tipoEntidad, entidadId and tipoDocumentoId propeties,
but there isn't a tipoDocumento with tipoDocumentoId`, () => {
    test('Then it should call getFileIdentifierObj', () => {
      getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
      uploadFile(fileData).then(
        () => expect(db.getFileIdentifierObj).toHaveBeenCalledWith(fileData),
      );
    });

    test('THEN it should call checkers.throwErrorIfDataIsFalsy function', () => {
      findOneEntityType.mockReturnValueOnce(entityType);
      findOneDocumentType.mockReturnValueOnce(documentType);

      uploadFile(fileData).then(
        () => expect(checkers.throwErrorIfDataIsFalsy).toHaveBeenCalledWith(...tipoEntidadCheck),
      );
    });

    test('THEN it should throw an error', () => {
      findOneEntityType.mockReturnValueOnce(entityType);
      findOneDocumentType.mockReturnValueOnce(notFoundResponse);

      uploadFile(fileData).catch((error) => expect(error).toBe(Error));
    });

    test('THEN it should call boom.notFound function', () => {
      findOneEntityType.mockReturnValueOnce(entityType);
      findOneDocumentType.mockReturnValueOnce(notFoundResponse);

      uploadFile(fileData).catch(() => expect(boom.notFound).toHaveBeenCalled());
    });
  });

  describe(`When this object have tipoEntidad, entidadId and tipoDocumentoId propeties,
but there is no file with this values`, () => {
    beforeEach(() => {
      getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
    });

    test('Then it should call getFileIdentifierObj', () => {
      uploadFile(fileData).then(
        () => expect(db.getFileIdentifierObj).toHaveBeenCalledWith(fileData),
      );
    });

    test('THEN it should call db.findOneFile', () => {
      uploadFile(fileData).catch(() => expect(db.findOneFile).toHaveBeenCalled());
    });

    test('THEN it should call checkers.throwErrorifIsFalsy', () => {
      jest.isolateModules(() => {
        const { findOneFileQuery } = jest.requireMock('../../../src/adapters/db/files.db.adapters');

        findOneFileQuery.mockReturnValue(notFoundResponse);
        uploadFile(fileData).catch(() => expect(
          db.findOneFile,
        ).toHaveReturnedWith(notFoundResponse));
      });
    });

    test('THEN it should call writeBus', () => {
      findOneFile.mockImplementationOnce(() => previousFileNotFound);

      uploadFile(fileData, fileUploaded).then(() => expect(
        fsModule.writeBus,
      ).toHaveBeenCalledWith(fileUploaded, fileData, previousFileNotFound));
    });

    test('THEN it should call upload db.createFile function', () => {
      findOneFile.mockImplementationOnce(() => previousFileNotFound);
      writeBus.mockImplementationOnce(() => fileName);
      createFile.mockImplementationOnce(jest.fn());

      uploadFile(fileData, fileUploaded).then(() => expect(
        db.createFile,
      ).toHaveBeenCalledWith(uploadFileData));
    });

    test('THEN it should return an object with fileData information', () => {
      findOneFile.mockImplementationOnce(() => previousFileNotFound);
      writeBus.mockImplementationOnce(() => fileName);
      createFile.mockReturnValue(fileData);

      uploadFile(fileData).then((data) => expect(
        data,
      ).toMatchObject(fileData));
    });
  });

  describe(`When this object have tipoEntidad, entidadId and tipoDocumentoId propeties,
but there is a file with this values`, () => {
    beforeEach(() => {
      getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
    });

    test('Then it should call getFileIdentifierObj', () => {
      uploadFile(fileData).then(
        () => expect(db.getFileIdentifierObj).toHaveBeenCalledWith(fileData),
      );
    });

    test('THEN it should call db.findOneFile', () => {
      uploadFile(fileData).then(() => expect(db.findOneFile).toHaveBeenCalled());
    });

    test('THEN it should call checkers.throwErrorifIsFalsy', () => {
      jest.isolateModules(() => {
        const { findOneFileQuery } = jest.requireMock('../../../src/adapters/db/files.db.adapters');

        getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
        findOneFileQuery.mockReturnValue(previousFile);

        uploadFile(fileData).catch(() => expect(
          db.findOneFile,
        ).toHaveReturnedWith(previousFile));
      });
    });

    test('THEN it should call writeBus', () => {
      findOneFile.mockImplementationOnce(() => previousFile);

      uploadFile(fileData, fileUploaded).catch(() => expect(
        fsModule.writeBus,
      ).toHaveBeenCalledWith(fileUploaded, fileData, previousFile.nombre));
    });

    test('THEN it should call upload db.createFile function', () => {
      findOneFile.mockImplementationOnce(() => previousFile);
      writeBus.mockImplementationOnce(() => fileName);
      updateFile.mockImplementationOnce(jest.fn());

      uploadFile(fileData, fileUploaded).then(() => expect(
        db.updateFile,
      ).toHaveBeenCalledWith(previousFile.id, uploadFileData));
    });

    test('THEN it should return an object with fileData information', () => {
      findOneFile.mockImplementationOnce(() => previousFile);
      writeBus.mockImplementationOnce(() => fileName);
      updateFile.mockReturnValue(fileData);

      uploadFile(fileData).then((data) => expect(
        data,
      ).toMatchObject(fileData));
    });
  });
});
