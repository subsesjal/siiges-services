function isThisDatatype(variable, expectedDatatype) {
  // eslint-disable-next-line valid-typeof
  if (typeof variable === expectedDatatype) {
    return true;
  }

  return false;
}

module.exports = isThisDatatype;
