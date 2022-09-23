const boom = require('@hapi/boom');
const fs = require('fs');
const mime = require('mime-types');

function fileExist(filePath) {
  return fs.existsSync(filePath);
}

function fileNotExist(filePath) {
  return !fileExist(filePath);
}

function createFile(file, fileName, filePath) {
  const tmpFilePath = file.path;
  const src = fs.createReadStream(tmpFilePath);
  const dest = fs.createWriteStream(filePath);

  src.pipe(dest);
  src.on('end', () => fileName);
  src.on('error', (err) => {
    throw boom.conflict(`There was a conflict: ${err}`);
  });
}

function createFileIfNotExist(file, fileName, filePath) {
  if (fileNotExist(filePath)) createFile(file, fileName, filePath);
}

function getFileName(tipoDocumento, file) {
  return `${(tipoDocumento.toLowerCase())}_${Date.now()}.${mime.extension(file.mimetype)}`;
}

module.exports = {
  createFileIfNotExist,
  getFileName,
};
