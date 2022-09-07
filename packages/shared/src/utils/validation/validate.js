// Internal dependencies
const Logger = require('../logger');
// Internal dependencies
const validatorsFnObject = require('../constants/validators-fn-object');

function getValidator(datatype = 'GENERAL') {
  const key = datatype.toUpperCase();
  if (validatorsFnObject[key] === undefined) {
    Logger.warn(`[shared] Reference Error to undefined property \
    "${datatype}" return GENERAL validator instead`);

    return validatorsFnObject.GENERAL;
  }

  return validatorsFnObject[key];
}

function validate({
  nameVar,
  valueVar,
  expectedDatatype,
}) {
  const validatorFn = getValidator(expectedDatatype);
  if (!validatorFn(valueVar, expectedDatatype)) {
    Logger.warn(`[shared/validate] TypeError this ${nameVar} \
is not "${expectedDatatype}"`);
  }
}

module.exports = validate;
