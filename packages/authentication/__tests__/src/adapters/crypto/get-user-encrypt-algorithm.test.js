// External dependencies
const { validate, Logger } = require('@siiges-services/shared');
// Internal dependencies
const { fakeBasicData } = require('../../../auxiliary-constants');
const { hashMD5, hmac } = require('../../../../src/drivers/crypto');
const { getUserEncryptAlgorithm } = require('../../../../src/use-cases/crypto');

jest.mock('@siiges-services/shared', () => {
  const originalModules = jest.requireActual('@siiges-services/shared');
  return {
    ...originalModules,
    validate: jest.fn(),
    nodejs: jest.fn(),
  };
});

Logger.warn = jest.fn();

describe('Given a call to getUserEncryptAlgorithm', () => {
  test('THEN it should called validate', () => {
    getUserEncryptAlgorithm(fakeBasicData.constant.bool);
    expect(validate).toHaveBeenCalled();
  });

  describe("When the password hasn't been updated", () => {
    test('THEN it should return hashMD5 algorithm', () => {
      const returnValue = getUserEncryptAlgorithm(false);
      expect(returnValue).toBe(hashMD5);
    });
  });

  describe('Whent the password already has been updated', () => {
    test('THEN it should return hmac algorithm', () => {
      const returnValue = getUserEncryptAlgorithm({ passwordUpdated: true });
      expect(returnValue).toBe(hmac);
    });
  });
});
