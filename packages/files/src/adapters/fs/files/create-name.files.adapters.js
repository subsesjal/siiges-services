const mime = require('mime-types');

function createFileName(tipoDocumento, uploadFile, entidadId) {
  return `${(tipoDocumento.toLowerCase())}_${entidadId}_${Date.now()}.${mime.extension(uploadFile.mimetype)}`;
}

module.exports = createFileName;
