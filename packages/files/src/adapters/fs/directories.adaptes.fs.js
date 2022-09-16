const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');

async function existFileDir(dirFilePath) {
  const statsPath = await fsp.stat(dirFilePath);
  const isDirectory = statsPath.isDirectory();

  const existPath = fs.existsSync(dirFilePath);

  return isDirectory && existPath;
}

async function notExistFileDir(dirFilePath) {
  return !existFileDir(dirFilePath);
}

async function makeFileDir(dirFilePath) {
  await fsp.mkdir(dirFilePath, { recursive: true });
}

async function createFileDirIfNotExist(dirFilePath) {
  if (notExistFileDir(dirFilePath)) makeFileDir(dirFilePath);
}

function getFileDirPath(tipoEntidad, tipoDocumento) {
  return path.join(__dirname, '../../../../../', 'public', 'uploads', tipoEntidad, tipoDocumento);
}

module.exports = {
  createFileDirIfNotExist,
  getFileDirPath,
};
