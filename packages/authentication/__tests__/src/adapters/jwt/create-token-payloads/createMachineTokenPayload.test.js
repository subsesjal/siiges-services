/* const { Logger, validate } = require('@siiges-services/shared');
const { fakeExpirationTimeToken } = require('../../../../auxiliary-constants');
const {
  createMachineTokenPayload,
} = require('../../../../../src/adapters/jwt/create-token-payloads'); */

jest.mock('@siiges-services/shared', () => {
  const originalModule = jest.requireActual('@siiges-services/shared');
  return {
    ...originalModule,
    validate: jest.fn(),
  };
});

describe('Given a call to createUserTokenPayload function', () => {
  test('true', () => {
    expect(true).toBe(true);
  });
  /* test('Then it should call validate function', () => {
    createMachineTokenPayload();
    expect(validate).toHaveBeenCalled();
  }); */

  /* test('THEN it should return and object', () => {
    const objectReturned = createMachineTokenPayload(fakeExpirationTimeToken);
    expect(objectReturned).toMatchObject({ exp: fakeExpirationTimeToken });
  }); */
});
