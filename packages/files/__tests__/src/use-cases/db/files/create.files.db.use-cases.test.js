// Internal dependencies
const { file } = require('../../../../query-response');

describe('Given a call to createFile', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When the entry with the identifierObj doesnt exist', () => {
    test('THEN it should throw error', () => {
      const { createFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      createFileQuery.mockReturnValueOnce(null);

      const { createFile } = jest.requireActual('../../../../../src/useCases/db/files');

      createFile().catch((error) => expect(error).toBe(Error));
    });
  });

  describe('When the entry with the indentifierObj exist', () => {
    test('THEN it should return the query response', async () => {
      const { createFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      createFileQuery.mockReturnValueOnce(file);

      const { createFile } = jest.requireActual('../../../../../src/useCases/db/files');

      const returnValue = await createFile();
      expect(returnValue).toMatchObject(file);
    });
  });
});
