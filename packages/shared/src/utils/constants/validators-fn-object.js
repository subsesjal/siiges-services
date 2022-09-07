const checkers = require('../checkers');

const validatorsFnObject = {
  STRING: checkers.isString,
  NOT_STRING: checkers.isNotString,
  NUMBER: checkers.isNumber,
  NOT_NUMBER: checkers.isNotNumber,
  UNDEFINED: checkers.isUndefined,
  DEFINED: checkers.isDefined,
  NULL: checkers.isNull,
  NOT_NULL: checkers.isNotNull,
  FALSY: checkers.isFalsy,
  TRUTHY: checkers.isTruthy,
  GENERAL: checkers.isThisDatatype,
};

module.exports = validatorsFnObject;
