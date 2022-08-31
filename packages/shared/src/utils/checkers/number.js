function isNumber(variable) {
  if (typeof variable === 'number'
  || variable instanceof Number) {
    return true;
  }

  return false;
}

function isNotNumber(variable) {
  return !isNumber(variable);
}

module.exports = {
  isNumber,
  isNotNumber,
};
