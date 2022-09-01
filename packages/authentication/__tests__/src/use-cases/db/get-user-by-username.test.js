// External dependencies
const { Logger } = require('@siiges-services/shared');
const { models } = require('@siiges-services/core');
// Internal dependencies
const getUserByUsername = require('../../../../src/use-cases/db/get-user-by-username');
const { UserModelResponse } = require('../../../auxiliary-constants');

jest.mock('@siiges-services/core', () => ({
  models: {
    Usuario: {
      findOne: jest.fn(),
    },
  },
}));
Logger.error = jest.fn();

describe('Given a call to getUserByUsername', () => {
  describe("When the username doesn't exist", () => {
    test('THEN it should throw and error', async () => {
      try {
        models.Usuario.findOne.mockReturnValueOnce(null);
        await getUserByUsername(UserModelResponse.usuario);
      } catch (error) {
        expect(error.output.payload.message)
          .toMatch(`Unable to find username ${UserModelResponse.usuario} in our database`);
      }
    });
  });

  describe('When the username exist', () => {
    test('THEN it should return the username', async () => {
      models.Usuario.findOne.mockReturnValueOnce({ dataValues: UserModelResponse });
      const returnValue = await getUserByUsername(UserModelResponse.usuario);

      expect(returnValue).toBe(UserModelResponse);
    });
  });
});
