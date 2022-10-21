// External depenendies
const { Logger } = require('@siiges-services/shared');
const fsp = require('fs/promises');
// Internal dependencies
const { notExist } = require('./exist.directories.fs.adapters');

async function create(dirFilePath) {
  Logger.info(`[files]: Making directory with path ${dirFilePath}`);
  await fsp.mkdir(dirFilePath, { recursive: true });
  Logger.info(`[files]: Directory made with path ${dirFilePath}`);
}

async function createIfNotExist(dirFilePath) {
  if (await notExist(dirFilePath)) await create(dirFilePath);
}

module.exports = {
  createIfNotExist,
};
