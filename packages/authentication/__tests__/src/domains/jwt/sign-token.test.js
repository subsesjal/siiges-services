// Internal dependencies
const {
  fakeExpirationTimeToken,
} = require('../../../auxiliary-constants');
const {
  signToken,
} = require('../../../../src/domains/jwt/sign-token');

describe('Given a call to signMachineToken', () => {
  describe('When payloadObjet is defined', () => {
    test('THEN it should return a string', () => {
      const returnValue = signToken({ exp: fakeExpirationTimeToken });
      expect(typeof returnValue).toBe('string');
    });
  });

  describe('When payloadObject is not pass', () => {
    test('THEN it should throw an error', () => {
      expect(signToken).toThrowError();
    });

    test('THEN it should throw an error', () => {
      expect(signToken).toThrowError('payload is required');
    });
  });
});
