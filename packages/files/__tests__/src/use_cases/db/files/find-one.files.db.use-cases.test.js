// Internal dependencies
const { file } = require('../../../../query-response');

jest.mock('../../../../../src/useCases/db/files/get-identifier-obj.files.db.use-cases', () => ({
  getFileIdentifierObj: jest.fn(),
}));

describe('Given a call to findOneFileByParams', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When the entry with the identifierObj doesnt exist', () => {
    test('THEN it should throw error', () => {
      const { findOneFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      findOneFileQuery.mockReturnValueOnce(null);

      const { findOneFileByParams } = jest.requireActual('../../../../../src/useCases/db/files');

      findOneFileByParams().catch((error) => expect(error).toBe(Error));
    });
  });

  describe('When the entry with the indentifierObj exist', () => {
    test('THEN it should return the query response', async () => {
      const { findOneFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      findOneFileQuery.mockReturnValueOnce(file);

      const { findOneFileByParams } = jest.requireActual('../../../../../src/useCases/db/files');

      const returnValue = await findOneFileByParams();
      expect(returnValue).toMatchObject(file);
    });
  });
});
