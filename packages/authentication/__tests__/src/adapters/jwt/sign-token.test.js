// Internal dependencies
/* const {
  fakeExpirationTimeToken,
} = require('../../../auxiliary-constants'); */
const {
  signToken,
} = require('../../../../src/adapters/jwt/sign-token');

describe('Given a call to signMachineToken', () => {
  describe('When payloadObject is not pass', () => {
    test('THEN it should throw an error', () => {
      expect(signToken).toThrowError();
    });

    test('THEN it should throw an error', () => {
      expect(signToken).toThrowError('payload is required');
    });
  });
});
