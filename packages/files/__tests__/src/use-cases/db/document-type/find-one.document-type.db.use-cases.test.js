// Internal dependencies
const { documentType } = require('../../../../query-response');

describe('Given a call to findOneDocumentType', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When the entry with the identifierObj doesnt exist', () => {
    test('THEN it should throw error', () => {
      const { findOneQueryDocumentType } = jest.requireMock('../../../../../src/adapters/db/document-type.db.adapters');
      findOneQueryDocumentType.mockReturnValueOnce(null);

      const { findOneDocumentType } = jest.requireActual('../../../../../src/useCases/db/document-type');
      findOneDocumentType().catch((error) => expect(error).toBe(Error));
    });
  });

  describe('When the entry with the indentifierObj exist', () => {
    test('THEN it should return the query response', async () => {
      const { findOneQueryDocumentType } = jest.requireMock('../../../../../src/adapters/db/document-type.db.adapters');
      findOneQueryDocumentType.mockReturnValueOnce(documentType);

      const { findOneDocumentType } = jest.requireActual('../../../../../src/useCases/db/document-type');

      const returnValue = await findOneDocumentType();
      expect(returnValue).toMatchObject(documentType);
    });
  });
});
