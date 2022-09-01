// External dependencies
const { Logger } = require('@siiges-services/shared');
// Internal dependencies
const {
  UserModelResponse,
  RolModelResponse,
  fakeBasicData,
} = require('../../auxiliary-constants');
const validateUserPayload = require('../../../src/utils/validate-user-payload');

Logger.error = jest.fn();

describe('Given a call to validateUserPayload', () => {
  describe('When usuario and rol are defined', () => {
    test('THEN it should return indefined', () => {
      const { usuario } = UserModelResponse;
      const rol = RolModelResponse.nombre;
      const returnValue = validateUserPayload({ usuario, rol });

      expect(returnValue).toBeUndefined();
    });
  });

  describe('When usuario is not a string', () => {
    test('THEN it should throw a boom error', () => {
      const rol = RolModelResponse.nombre;
      const usuario = fakeBasicData.constant.number;

      try {
        validateUserPayload({ usuario, rol });
      } catch (error) {
        expect(error.output.payload.message)
          .toMatch(`[signUserToken] "usuario" is not string. \
Pass ${typeof usuario} instead`);
      }
    });
  });

  describe('when rol is not a string', () => {
    const rol = fakeBasicData.constant.number;
    const { usuario } = UserModelResponse;

    try {
      validateUserPayload({ usuario, rol });
    } catch (error) {
      expect(error.output.payload.message)
        .toMatch(`[signUserToken] "rol" is not string. \
Pass ${typeof rol} instead`);
    }
  });
});
