// External depenendies
const fsp = require('fs/promises');
// Internal dependencies
const { pathNotExist } = require('../path-exist.fs.adapters');

async function exist(directoryPath) {
  if (pathNotExist(directoryPath)) return false;

  const statsPath = await fsp.stat(directoryPath);
  const isDirectory = statsPath.isDirectory();

  return isDirectory;
}

async function notExist(dirFilePath) {
  return !(await exist(dirFilePath));
}

module.exports = {
  exist,
  notExist,
};
