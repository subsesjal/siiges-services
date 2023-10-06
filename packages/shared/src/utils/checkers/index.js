// Internal dependencies
const isDevEnvironment = require('./is-development');
const isProdEnvironment = require('./is-production');
const isTestEnvironment = require('./is-test');
const isCiEnvironment = require('./is-ci');
const isThisDatatype = require('./is-this-datatype');
const { isFalsy, isTruthy } = require('./truthy-falsy');
const { isNumber, isNotNumber } = require('./number');
const { isString, isNotString } = require('./string');
const { IsDate, isNotDate } = require('./date');
const { isNull, isNotNull } = require('./null');
const { isUndefined, isDefined } = require('./undefined');
const { throwErrorIfDataIsFalsy, findValidator } = require('./db.checkers.utils');
const { cleanObject } = require('./cleanObject');

module.exports = {
  isDevEnvironment,
  isProdEnvironment,
  isTestEnvironment,
  isCiEnvironment,
  isTruthy,
  isFalsy,
  isNumber,
  isNotNumber,
  isString,
  isNotString,
  isThisDatatype,
  isNull,
  isNotNull,
  isDefined,
  isUndefined,
  throwErrorIfDataIsFalsy,
  IsDate,
  isNotDate,
  cleanObject,
  findValidator,
};
