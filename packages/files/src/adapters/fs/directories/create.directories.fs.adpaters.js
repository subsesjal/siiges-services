// External depenendies
const fsp = require('fs/promises');
// Internal dependencies
const { notExist } = require('./exist.directories.fs.adapters');

async function create(dirFilePath) {
  await fsp.mkdir(dirFilePath, { recursive: true });
}

async function createIfNotExist(dirFilePath) {
  if (await notExist(dirFilePath)) await create(dirFilePath);
}

module.exports = {
  createIfNotExist,
};
