/**
 * Cleans an object by removing special characters from string properties.
 * @param {Object} object - The object to be cleaned.
 * @returns {Object} - The cleaned object.
 */
function cleanObject(object) {
  Object.keys(object).forEach((property) => {
    if (typeof object[property] === 'string') {
      // Removes special characters using a regular expression
      // eslint-disable-next-line no-param-reassign
      object[property] = object[property].replace(/[^\w\s]/gi, '');
    }
  });

  return object;
}
module.exports = {
  cleanObject,
};
