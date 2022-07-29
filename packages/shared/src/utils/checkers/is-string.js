const isString = (variable) => {
  if (typeof variable === 'string') {
    return true;
  }

  return false;
};

module.exports = isString;
