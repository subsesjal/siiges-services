// Internal dependencies
const { file } = require('../../../../query-response');

jest.mock('../../../../../src/useCases/db/files/get-identifier-obj.files.db.use-cases', () => ({
  getFileIdentifierObj: jest.fn(),
}));

describe('Given a call to findOneFile', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When the entry with the identifierObj doesnt exist', () => {
    test('THEN it should return null', async () => {
      const { findOneFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      findOneFileQuery.mockReturnValueOnce(null);

      const { findOneFile } = jest.requireActual('../../../../../src/useCases/db/files');
      const returnValue = await findOneFile();

      expect(returnValue).toBe(null);
    });
  });

  describe('When the entry with the indentifierObj exist', () => {
    test('THEN it should return the query response', async () => {
      const { findOneFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      findOneFileQuery.mockReturnValueOnce(file);

      const { findOneFile } = jest.requireActual('../../../../../src/useCases/db/files');

      const returnValue = await findOneFile();
      expect(returnValue).toMatchObject(file);
    });
  });
});
