function isString(variable) {
  if ((typeof variable === 'string'
  || variable instanceof String)
  && variable.length !== 0) {
    return true;
  }

  return false;
}

function isNotString(variable) {
  return !isString(variable);
}

module.exports = {
  isString,
  isNotString,
};
