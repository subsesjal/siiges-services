const mime = require('mime-types');

function createFileName(tipoDocumento, uploadFile) {
  return `${(tipoDocumento.toLowerCase())}_${Date.now()}.${mime.extension(uploadFile.mimetype)}`;
}

module.exports = createFileName;
