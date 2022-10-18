const mime = require('mime-types');

function createFileName(tipoDocumento, file) {
  return `${(tipoDocumento.toLowerCase())}_${Date.now()}.${mime.extension(file.mimetype)}`;
}

module.exports = createFileName;
