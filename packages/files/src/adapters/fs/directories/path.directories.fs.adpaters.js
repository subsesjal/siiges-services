const path = require('path');
const { config } = require('../../../../config/environment');

function createPath(tipoEntidad, tipoDocumento) {
  return path.join(process.env.PATH_FILE, 'public', 'uploads', tipoEntidad, tipoDocumento);
}

module.exports = { createPath };
