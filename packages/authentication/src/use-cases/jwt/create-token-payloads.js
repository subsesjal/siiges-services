// External dependencies
const { validate } = require('@siiges-services/shared');
// Internal dependencies
const { validateUserPayload } = require('../../utils');

function createBaseTokenPayload(exp) {
  validate({
    nameVar: 'exp',
    valueVar: exp,
    expectedDatatype: 'number',
  });

  const tokenObject = {
    exp,
  };
  return tokenObject;
}

function createMachineTokenPayload(exp) {
  return createBaseTokenPayload(exp);
}

function createUserTokenPayload(exp, payloadObject) {
  validateUserPayload(payloadObject);

  const tokenObject = createBaseTokenPayload(exp);
  return {
    ...tokenObject,
    ...payloadObject,
  };
}

module.exports = {
  createMachineTokenPayload,
  createUserTokenPayload,
};
