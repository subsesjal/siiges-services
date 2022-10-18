// External dependencies
const boom = require('@hapi/boom');
const { faker } = require('@faker-js/faker');
// Internal dependencies
const { deleteFile } = require('../../../src/useCases');
const { findOneDocumentType } = require('../../../src/useCases/db/document-type');
const { findOneEntityType } = require('../../../src/useCases/db/entity-type');

const { fileData } = require('../../constants');
const {
  entityType,
  documentType,
  identifierObj,
  file,
} = require('../../query-response');

const db = require('../../../src/useCases/db');
const fs = require('../../../src/useCases/fs');

jest.mock('../../../src/useCases/db/document-type', () => ({
  findOneDocumentType: jest.fn(),
}));

jest.mock('../../../src/useCases/db/entity-type', () => ({
  findOneEntityType: jest.fn(),
}));

jest.mock('../../../src/useCases/fs', () => ({
  __esmodule: true,
  deleteBus: jest.fn(),
}));

const notFoundResponse = null;
file.deleteAt = faker.date.recent();

const getFileIdentifierObj = jest.spyOn(db, 'getFileIdentifierObj');
const dbDeleteFile = jest.spyOn(db, 'deleteFile');

describe('Given a object with our file data needed to search the file in our db', () => {
  test('THEN db.getFileIdentifierObj should have been called', () => {
    deleteFile({}).catch(() => expect(db.getFileIdentifierObj).toHaveBeenCalled());
  });

  describe("When this object doesn't have entidadId, tipoEntidad, tipoDocumento keys", () => {
    test('THEN it should throw an error', async () => {
      deleteFile({}).catch((error) => expect(error).toBe(Error));
    });
  });

  describe("When a  an entidad type with tipoEntidadId doesn't exist", () => {
    test('THEN it should throw error', () => {
      const wrongFileData = {
        ...fileData,
        entidadId: notFoundResponse,
      };
      findOneDocumentType.mockReturnValue(documentType);
      findOneEntityType.mockReturnValue(notFoundResponse);

      deleteFile(wrongFileData).catch((error) => expect(error).toBe(Error));
    });
  });

  test('THEN boom.notFound should have been called', () => {
    const wrongFileData = {
      ...fileData,
      entidadId: notFoundResponse,
    };
    findOneDocumentType.mockReturnValue(documentType);
    findOneEntityType.mockReturnValue(notFoundResponse);

    deleteFile(wrongFileData).catch(() => expect(boom.notFound).toHaveBeenCalled());
  });
  describe("When a  an document type with tipoDocumentoId doesn't exist", () => {
    test('THEN it should throw error', () => {
      const wrongFileData = {
        ...fileData,
        entidadId: notFoundResponse,
      };
      findOneDocumentType.mockReturnValue(notFoundResponse);
      findOneEntityType.mockReturnValue(entityType);

      deleteFile(wrongFileData).catch((error) => expect(error).toBe(Error));
    });

    test('THEN it should have called boom.notFound', () => {
      const wrongFileData = {
        ...fileData,
        entidadId: notFoundResponse,
      };
      findOneDocumentType.mockReturnValue(notFoundResponse);
      findOneEntityType.mockReturnValue(entityType);

      deleteFile(wrongFileData).catch(() => expect(boom.notFound).toHaveBeenCalled());
    });
  });

  describe("When a file with tipoEntidadId, tipoDocumentoId and entidadId doen't exist", () => {
    test('THEN it should call getFileIdentifierObj', () => {
      deleteFile({ fileData }).catch(() => expect(getFileIdentifierObj).toHaveBeenCalled());
    });

    test('THEN it should call findOneFileByParams', () => {
      getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
      deleteFile({ fileData }).catch(() => expect(dbDeleteFile).toHaveBeenCalled());
    });

    test('THEN it should trow an error', () => {
      jest.isolateModules(() => {
        const { deleteFileQuery } = jest.requireMock('../../../src/adapters/db/files.db.adapters');
        getFileIdentifierObj.mockImplementation(() => identifierObj);
        deleteFileQuery.mockReturnValue(notFoundResponse);
        deleteFile({ ...fileData }).catch((error) => expect(error).toBe(Error));
      });
    });

    test('THEN it should call boom.notFound', () => {
      jest.isolateModules(() => {
        const { deleteFileQuery } = jest.requireMock('../../../src/adapters/db/files.db.adapters');
        getFileIdentifierObj.mockImplementation(() => identifierObj);
        deleteFileQuery.mockReturnValue(notFoundResponse);
        deleteFile({ ...fileData }).catch(() => expect(boom.notFound).toHaveBeenCalled());
      });
    });
  });

  describe('When a file with tipoEntidadId, tipoDocumentoId and entidadId exist', () => {
    test('TEST then it should call getFileIdentifierObj', () => {
      getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
      dbDeleteFile.mockImplementationOnce(() => file);
      deleteFile(fileData).then(() => expect(getFileIdentifierObj).toHaveBeenCalled());
    });

    test('TEST then it should call db.deleteFile', () => {
      getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
      dbDeleteFile.mockImplementationOnce(() => file);
      deleteFile(fileData).then(() => expect(dbDeleteFile).toHaveBeenCalled());
    });

    test('TEST then it should call fs.deleteBus', () => {
      getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
      dbDeleteFile.mockImplementationOnce(() => file);
      deleteFile(fileData).then(() => expect(fs.deleteBus).toHaveBeenCalled());
    });

    test('TEST then it should return file object', () => {
      getFileIdentifierObj.mockImplementationOnce(() => identifierObj);
      dbDeleteFile.mockImplementationOnce(() => file);
      deleteFile(fileData).then((response) => expect(response).toMatchObject(file));
    });
  });
});
