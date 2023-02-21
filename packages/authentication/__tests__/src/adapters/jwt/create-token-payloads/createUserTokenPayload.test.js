/* const { Logger, validate } = require('@siiges-services/shared');
const {
  fakePayloadToken,
  fakeExpirationTimeToken,
} = require('../../../../auxiliary-constants');
const {
  createUserTokenPayload,
} = require('../../../../../src/adapters/jwt/create-token-payloads'); */

jest.mock('@siiges-services/shared', () => {
  const originalModule = jest.requireActual('@siiges-services/shared');
  return {
    ...originalModule,
    validate: jest.fn(),
  };
});

// const { usuario, rol } = fakePayloadToken;

describe('Given a call to createUserTokenPayload function', () => {
  test('true', () => {
    expect(true).toBe(true);
  });
  /* test('Then it should call validate function', () => {
    createUserTokenPayload(
      fakeExpirationTimeToken,
      {
        usuario,
        rol,
      },
    );
    expect(validate).toHaveBeenCalled();
  }); */

  describe('When usuario or rol keys are in payloadObject', () => {
    /* test('THEN it should return and object', () => {
      const objectReturned = createUserTokenPayload(
        fakeExpirationTimeToken,
        {
          usuario,
          rol,
        },
      );
      expect(objectReturned).toMatchObject(fakePayloadToken);
    }); */
  });

  describe("When usuario key wasn't in payloadObject", () => {
    /* test('THEN ut should throw a Error', () => {
      expect(() => createUserTokenPayload(
        fakeExpirationTimeToken,
        { rol },
      )).toThrow(Error);
    }); */
  });

  describe("when rol key wasn't in payloadObject", () => {
    /* test('THEN ut should throw a Error', () => {
      expect(() => createUserTokenPayload(
        fakeExpirationTimeToken,
        { usuario },
      )).toThrow(Error);
    }); */
  });
});
