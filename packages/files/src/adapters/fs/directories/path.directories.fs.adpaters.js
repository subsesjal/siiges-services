const path = require('path');
const { config } = require('../../../../config/environment');

function createPath(tipoEntidad, tipoDocumento) {
  return path.join(__dirname, config.pathFile, 'public', 'uploads', tipoEntidad, tipoDocumento);
}

module.exports = { createPath };
