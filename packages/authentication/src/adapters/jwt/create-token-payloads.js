// Internal dependencies
const { validate } = require('@siiges-services/shared');
const { validateUserPayload } = require('../../utils');

function createUserTokenPayload(payloadObject) {
  validate({
    nameVar: 'payloadObject',
    valueVar: payloadObject,
    expectedDatatype: 'object',
  });
  const newPayload = validateUserPayload(payloadObject);

  return {
    ...newPayload,
  };
}

module.exports = {
  createUserTokenPayload,
};
