function isUndefined(variable) {
  if (variable === undefined) {
    return true;
  }
  return false;
}

function isDefined(variable) {
  if (!isUndefined(variable)) {
    return true;
  }
  return false;
}

module.exports = {
  isDefined,
  isUndefined,
};
