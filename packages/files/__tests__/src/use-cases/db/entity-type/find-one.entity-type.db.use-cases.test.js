// Internal dependencies
const { entityType } = require('../../../../query-response');

describe('Given a call to findOneEntityType', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('When the entry with the identifierObj doesnt exist', () => {
    test('THEN it should throw error', () => {
      const { findOneQueryEntityType } = jest.requireMock('../../../../../src/adapters/db/entity-type.db.adapters');
      findOneQueryEntityType.mockReturnValueOnce(null);

      const { findOneEntityType } = jest.requireActual('../../../../../src/useCases/db/entity-type');

      findOneEntityType().catch((error) => expect(error).toBe(Error));
    });
  });

  describe('When the entry with the indentifierObj exist', () => {
    test('THEN it should return the query response', async () => {
      const { findOneQueryEntityType } = jest.requireMock('../../../../../src/adapters/db/entity-type.db.adapters');
      findOneQueryEntityType.mockReturnValueOnce(entityType);

      const { findOneEntityType } = jest.requireActual('../../../../../src/useCases/db/entity-type');

      const returnValue = await findOneEntityType();
      expect(returnValue).toMatchObject(entityType);
    });
  });
});
