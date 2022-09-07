// External dependencies
const { Logger, validate } = require('@siiges-services/shared');
// Internal dependencies
const { fakeExpirationTimeToken } = require('../../../../auxiliary-constants');
const {
  createMachineTokenPayload,
} = require('../../../../../src/use-cases/jwt/create-token-payloads');

jest.mock('@siiges-services/shared', () => {
  const originalModule = jest.requireActual('@siiges-services/shared');
  return {
    ...originalModule,
    validate: jest.fn(),
  };
});
Logger.error = jest.fn();

describe('Given a call to createUserTokenPayload function', () => {
  test('Then it should call validate function', () => {
    createMachineTokenPayload();
    expect(validate).toHaveBeenCalled();
  });

  test('THEN it should return and object', () => {
    const objectReturned = createMachineTokenPayload(fakeExpirationTimeToken);
    expect(objectReturned).toMatchObject({ exp: fakeExpirationTimeToken });
  });
});
