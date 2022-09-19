// External dependencies
const { validate } = require('@siiges-services/shared');
// Internal dependencies

function encryptString(string, algorithm) {
  validate({
    nameVar: 'string',
    valueVar: string,
    expectedDatatype: 'string',
  });
  validate({
    nameVar: 'algorithm',
    valueVar: algorithm,
    expectedDatatype: 'defined',
  });

  algorithm.update(string);
  return algorithm.digest('hex');
}

module.exports = encryptString;
