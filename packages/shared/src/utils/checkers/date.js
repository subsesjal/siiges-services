function IsDate(variable) {
  const regex = /^\d{4}-\d{2}-\d{2}/;

  if (variable.match(regex) === null) {
    return false;
  }

  const date = new Date(variable);

  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(variable);
}

function isNotDate(variable) {
  return !IsDate(variable);
}

module.exports = {
  IsDate,
  isNotDate,
};
