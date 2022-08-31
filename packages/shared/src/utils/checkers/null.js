function isNull(variable) {
  if (variable === null || variable === 'null') {
    return true;
  }
  return false;
}

function isNotNull(variable) {
  if (!isNull(variable)) {
    return true;
  }
  return false;
}

module.exports = {
  isNull,
  isNotNull,
};
