// External dependencies
const { join } = require('path');
// Internal dependencies
const { uploadDir } = require('../../../utils/constants');

function createPath(fileEntry = {}) {
  const { ubicacion = 'undefined' } = fileEntry;
  return join(uploadDir, ubicacion);
}

module.exports = createPath;
