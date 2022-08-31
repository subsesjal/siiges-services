function isTruthy(variable) {
  if (variable) return true;

  return false;
}

function isFalsy(variable) {
  if (variable) return false;

  return true;
}

module.exports = {
  isTruthy,
  isFalsy,
};
