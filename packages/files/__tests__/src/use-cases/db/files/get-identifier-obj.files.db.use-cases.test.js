// Internal dependencies
const { documentType, entityType, identifierObj } = require('../../../../query-response');
const { fileData } = require('../../../../constants');

describe('Given a call to findOneEntityType', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When the entry in document type with the identifierObj params doesnt exist', () => {
    test('THEN it should throw error', () => {
      const { findOneQueryDocumentType } = jest.requireMock('../../../../../src/adapters/db/document-type.db.adapters');
      const { findOneQueryEntityType } = jest.requireMock('../../../../../src/adapters/db/entity-type.db.adapters');

      findOneQueryDocumentType.mockReturnValueOnce(null);
      findOneQueryEntityType.mockReturnValueOnce(documentType);

      const getFileIdentifierObj = jest.requireActual('../../../../../src/useCases/db/files/get-identifier-obj.files.db.use-cases');

      getFileIdentifierObj(fileData).catch((error) => expect(error).toBe(Error));
    });
  });

  describe('When the entry in entity type with the identifierObj params doesnt exist', () => {
    test('THEN it should throw error', () => {
      const { findOneQueryDocumentType } = jest.requireMock('../../../../../src/adapters/db/document-type.db.adapters');
      const { findOneQueryEntityType } = jest.requireMock('../../../../../src/adapters/db/entity-type.db.adapters');

      findOneQueryDocumentType.mockReturnValueOnce(entityType);
      findOneQueryEntityType.mockReturnValueOnce(null);

      const getFileIdentifierObj = jest.requireActual('../../../../../src/useCases/db/files/get-identifier-obj.files.db.use-cases');

      getFileIdentifierObj(fileData).catch((error) => expect(error).toBe(Error));
    });
  });

  describe('When entityId pass is falsy', () => {
    test('THEN it should throw error', () => {
      const { findOneQueryDocumentType } = jest.requireMock('../../../../../src/adapters/db/document-type.db.adapters');
      const { findOneQueryEntityType } = jest.requireMock('../../../../../src/adapters/db/entity-type.db.adapters');

      findOneQueryDocumentType.mockReturnValueOnce(documentType);
      findOneQueryEntityType.mockReturnValueOnce(entityType);

      const getFileIdentifierObj = jest.requireActual('../../../../../src/useCases/db/files/get-identifier-obj.files.db.use-cases');

      fileData.entidadId = false;
      getFileIdentifierObj(fileData).catch((error) => expect(error).toBe(Error));
    });
  });

  describe('When the entry in documentType and entityType with identigierObj exist and the entityId is not falsy', () => {
    test('THEN it should return the identifierObj', async () => {
      const { findOneQueryDocumentType } = jest.requireMock('../../../../../src/adapters/db/document-type.db.adapters');
      const { findOneQueryEntityType } = jest.requireMock('../../../../../src/adapters/db/entity-type.db.adapters');

      findOneQueryDocumentType.mockReturnValueOnce(documentType);
      findOneQueryEntityType.mockReturnValueOnce(entityType);

      const getFileIdentifierObj = jest.requireActual('../../../../../src/useCases/db/files/get-identifier-obj.files.db.use-cases');

      fileData.entidadId = identifierObj.entidadId;
      const returnObj = await getFileIdentifierObj(fileData);
      expect(returnObj).toMatchObject(identifierObj);
    });
  });
});
