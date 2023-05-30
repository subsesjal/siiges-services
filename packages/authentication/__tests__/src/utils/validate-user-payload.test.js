// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const {
  UserModelResponse,
  fakeBasicData,
} = require('../../auxiliary-constants');
const validateUserPayload = require('../../../src/utils/validate-user-payload');

Logger.error = jest.fn();

describe('Given a call to validateUserPayload', () => {
  describe('When usuario is not a string', () => {
    test('THEN it should throw a boom error', () => {
      const usuario = fakeBasicData.constant.number;
      const userPayload = JSON.parse(JSON.stringify(UserModelResponse));
      userPayload.usuario = usuario;

      try {
        validateUserPayload(userPayload);
      } catch (error) {
        expect(error.output.payload.message)
          .toMatch(`[signUserToken] "usuario" is not string. \
Pass ${typeof usuario} instead`);
      }
    });
  });

  describe('when rol is not a string', () => {
    const rol = fakeBasicData.constant.number;
    const userPayload = JSON.parse(JSON.stringify(UserModelResponse));

    userPayload.dataValues.rol.nombre = rol;

    try {
      validateUserPayload(userPayload);
    } catch (error) {
      expect(error.output.payload.message)
        .toMatch(`[signUserToken] "rol" is not string. \
Pass ${typeof rol} instead`);
    }
  });
});
