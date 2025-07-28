const { Logger } = require('@siiges-services/shared');
const mime = require('mime-types');

function createFileName(tipoDocumento, uploadFile, entidadId) {
  Logger.info('[files.createFileName]: Generating file name');
  return `${(tipoDocumento.toLowerCase())}_${entidadId}_${Date.now()}.${mime.extension(uploadFile.mimetype || 'application/pdf')}`;
}

module.exports = createFileName;
