const path = require('path');

function createPath(tipoEntidad, tipoDocumento) {
  return path.join(__dirname, '../../../../../../', 'public', 'uploads', tipoEntidad, tipoDocumento);
}

module.exports = { createPath };
