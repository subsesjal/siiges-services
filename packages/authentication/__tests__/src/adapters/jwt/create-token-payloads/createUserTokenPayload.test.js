// External dependencies
const { Logger, validate } = require('@siiges-services/shared');
// Internal dependencies
const {
  fakePayloadToken, UserModelResponse,
} = require('../../../../auxiliary-constants');
const {
  createUserTokenPayload,
} = require('../../../../../src/adapters/jwt/create-token-payloads');

jest.mock('@siiges-services/shared', () => {
  const originalModule = jest.requireActual('@siiges-services/shared');
  return {
    ...originalModule,
    validate: jest.fn(),
  };
});
Logger.error = jest.fn();

const { usuario, rol } = fakePayloadToken;

describe('Given a call to createUserTokenPayload function', () => {
  test('Then it should call validate function', () => {
    createUserTokenPayload(UserModelResponse);
    expect(validate).toHaveBeenCalled();
  });

  describe('When usuario or rol keys are in payloadObject', () => {
    test('THEN it should return and object', () => {
      const userPayload = JSON.parse(JSON.stringify(UserModelResponse));
      userPayload.dataValues.rol.nombre = fakePayloadToken.rol;

      const objectReturned = createUserTokenPayload(userPayload);
      expect(objectReturned).toMatchObject(fakePayloadToken);
    });
  });

  describe("When usuario key wasn't in payloadObject", () => {
    test('THEN ut should throw a Error', () => {
      expect(() => createUserTokenPayload(
        { rol },
      )).toThrow(Error);
    });
  });

  describe("when rol key wasn't in payloadObject", () => {
    test('THEN ut should throw a Error', () => {
      expect(() => createUserTokenPayload(
        { usuario },
      )).toThrow(Error);
    });
  });
});
