// External dependencies
const { faker } = require('@faker-js/faker');
// Internal dependencies
const { file } = require('../../../../query-response');

file.delete_at = faker.date.recent();

describe('Given a call to deleteFile', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When the entry with the identifierObj doesnt exist', () => {
    test('THEN it should throw error', () => {
      const { deleteFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      deleteFileQuery.mockReturnValueOnce(null);

      const { deleteFile } = jest.requireActual('../../../../../src/useCases/db/files');

      deleteFile().catch((error) => expect(error).toBe(Error));
    });
  });

  describe('When the entry with the indentifierObj exist', () => {
    test('THEN it should return the query response', async () => {
      const { deleteFileQuery } = jest.requireMock('../../../../../src/adapters/db/files.db.adapters');
      deleteFileQuery.mockReturnValueOnce(file);

      const { deleteFile } = jest.requireActual('../../../../../src/useCases/db/files');

      const returnValue = await deleteFile();
      expect(returnValue).toMatchObject(file);
    });
  });
});
