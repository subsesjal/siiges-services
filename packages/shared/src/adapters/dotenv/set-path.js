// External dependencies
const { join } = require('path');

// Internal dependencies

const setPath = (filename) => {
  const localPath = join(__dirname, '../../../../..', filename);
  return localPath;
};

module.exports = setPath;
