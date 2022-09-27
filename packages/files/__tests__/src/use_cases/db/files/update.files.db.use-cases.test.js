// Internal dependencies
const { file } = require('../../../../query-response');

describe('Given a call to deleteFile', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When the entry with the identifierObj doesnt exist', () => {
    test('THEN it should throw error', () => {
      const { updateFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      updateFileQuery.mockReturnValueOnce(null);

      const { updateFile } = jest.requireActual('../../../../../src/useCases/db/files');

      updateFile().catch((error) => expect(error).toBe(Error));
    });
  });

  describe('When the entry with the indentifierObj exist', () => {
    test('THEN it should return the query response', async () => {
      const { updateFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      updateFileQuery.mockReturnValueOnce(file);

      const { updateFile } = jest.requireActual('../../../../../src/useCases/db/files');

      const returnValue = await updateFile();
      expect(returnValue).toMatchObject(file);
    });
  });
});
