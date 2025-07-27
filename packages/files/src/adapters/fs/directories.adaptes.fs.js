const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const { config } = require('../../../config/environment');

async function existDir(dirFilePath) {
  const statsPath = await fsp.stat(dirFilePath);

  const isDirectory = statsPath.isDirectory();
  const existPath = fs.existsSync(dirFilePath);

  return isDirectory && existPath;
}

async function notExistDir(dirFilePath) {
  return !existDir(dirFilePath);
}

async function createDir(dirFilePath) {
  await fsp.mkdir(dirFilePath, { recursive: true });
}

async function createDirIfNotExist(dirFilePath) {
  if (notExistDir(dirFilePath)) createDir(dirFilePath);
}

function getFileDirPath(tipoEntidad, tipoDocumento) {
  return path.join(process.env.PATH_FILE, 'public', 'uploads', tipoEntidad, tipoDocumento);
}

module.exports = {
  createDirIfNotExist,
  getFileDirPath,
};
